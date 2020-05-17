package main

import (
	"gqlkit/env"
	"gqlkit/handler"
	"gqlkit/middleware/auth"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/rs/cors"
)

func main() {

	r := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{env.GQL_SERVER_ALLOW_ORIGIN},
		AllowedMethods: []string{"POST", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	})

	r.Use(middleware.SetHeader("Content-Type", "application/json"))
	r.Use(cors.Handler)
	r.Use(auth.Middleware())

	r.Handle("/", handler.Playground())
	r.Handle("/query", handler.Graphql())

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", env.GQL_SERVER_PORT)
	log.Fatal(http.ListenAndServe(":"+env.GQL_SERVER_PORT, r))
}
