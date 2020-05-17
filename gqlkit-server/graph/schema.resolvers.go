package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"gqlkit/env"
	"gqlkit/graph/generated"
	"gqlkit/graph/model"
	"gqlkit/middleware/auth"
	"time"

	"github.com/hako/branca"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"
	"github.com/satori/go.uuid"
)

func (r *mutationResolver) RegistQuantity(ctx context.Context, dateStr string, positive int, discharge int, death int, sickbedTotal int) (*model.Quantity, error) {
	//認証
	user := auth.UserEjector(ctx)
	if user == nil {
		return nil, fmt.Errorf("certification failed. Please obtain an access token and authenticate again.")
	}

	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	id := uuid.Must(uuid.NewV4(), nil)
	loc, _ := time.LoadLocation("Asia/Tokyo")
	t, _ := time.Parse("2006/1/2 15:04:05", dateStr)
	date := t.Format("2006-01-02T15:04:05+09:00")
	now := time.Now().In(loc).Format("2006-01-02T15:04:05+09:00")

	r.quantity = &model.Quantity{
		ID:           id.String(),
		PrefectureID: user.PrefectureID,
		Date:         date,
		Positive:     positive,
		Discharge:    discharge,
		Death:        death,
		SickbedTotal: sickbedTotal,
		CreatedAt:    &now,
		UpdatedAt:    now,
	}
	db.Create(&r.quantity)

	return r.quantity, nil
}

func (r *mutationResolver) UpdateQuantity(ctx context.Context, id string, dateStr string, positive int, discharge int, death int, sickbedTotal int) (*model.Quantity, error) {
	//認証
	user := auth.UserEjector(ctx)
	if user == nil {
		return nil, fmt.Errorf("certification failed. Please obtain an access token and authenticate again.")
	}

	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	loc, _ := time.LoadLocation("Asia/Tokyo")
	t, _ := time.Parse("2006/1/2 15:04:05", dateStr)
	date := t.Format("2006-01-02T15:04:05+09:00")
	now := time.Now().In(loc).Format("2006-01-02T15:04:05+09:00")

	db.Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).First(&r.quantities)
	r.quantity = r.quantities[0]

	db.Model(&r.quantity).Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Update("date", date)
	db.Model(&r.quantity).Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Update("positive", positive)
	db.Model(&r.quantity).Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Update("discharge", discharge)
	db.Model(&r.quantity).Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Update("death", death)
	db.Model(&r.quantity).Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Update("sickbed_total", sickbedTotal)
	db.Model(&r.quantity).Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Update("updated_at", now)

	return r.quantity, nil
}

func (r *mutationResolver) DeleteQuantity(ctx context.Context, id string) (*model.Quantity, error) {
	//認証
	user := auth.UserEjector(ctx)
	if user == nil {
		return nil, fmt.Errorf("certification failed. Please obtain an access token and authenticate again.")
	}

	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	db.Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).First(&r.quantities)
	r.quantity = r.quantities[0]
	db.Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Delete(&r.quantities)

	return r.quantity, nil
}

func (r *mutationResolver) CreateExternalLink(ctx context.Context, title string, url string) (*model.ExternalLink, error) {
	//認証
	user := auth.UserEjector(ctx)
	if user == nil {
		return nil, fmt.Errorf("certification failed. Please obtain an access token and authenticate again.")
	}

	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	id := uuid.Must(uuid.NewV4(), nil)
	loc, _ := time.LoadLocation("Asia/Tokyo")
	now := time.Now().In(loc).Format("2006-01-02T15:04:05+09:00")

	r.external_link = &model.ExternalLink{
		ID:           id.String(),
		PrefectureID: user.PrefectureID,
		Title:        title,
		URL:          url,
		CreatedAt:    &now,
		UpdatedAt:    now,
	}

	db.Create(&r.external_link)
	return r.external_link, nil
}

func (r *mutationResolver) UpdateExternalLink(ctx context.Context, id string, title string, url string) (*model.ExternalLink, error) {
	//認証
	user := auth.UserEjector(ctx)
	if user == nil {
		return nil, fmt.Errorf("certification failed. Please obtain an access token and authenticate again.")
	}

	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	loc, _ := time.LoadLocation("Asia/Tokyo")
	now := time.Now().In(loc).Format("2006-01-02T15:04:05+09:00")

	db.Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).First(&r.external_links)
	r.external_link = r.external_links[0]
	db.Model(&r.external_link).Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Update("title", title)
	db.Model(&r.external_link).Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Update("url", url)
	db.Model(&r.external_link).Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Update("updated_at", now)

	return r.external_link, nil
}

func (r *mutationResolver) DeleteExternalLink(ctx context.Context, id string) (*model.ExternalLink, error) {
	//認証
	user := auth.UserEjector(ctx)
	if user == nil {
		return nil, fmt.Errorf("certification failed. Please obtain an access token and authenticate again.")
	}

	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	db.Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).First(&r.external_links)
	r.external_link = r.external_links[0]
	db.Where("id = ? AND prefecture_id = ?", id, user.PrefectureID).Delete(&r.external_links)

	return r.external_link, nil
}

func (r *mutationResolver) UpdatePrefPublished(ctx context.Context, isPublished bool) (*model.Prefecture, error) {
	//認証
	user := auth.UserEjector(ctx)
	if user == nil {
		return nil, fmt.Errorf("certification failed. Please obtain an access token and authenticate again.")
	}

	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	db.Where("id = ?", user.PrefectureID).First(&r.prefs)
	r.pref = r.prefs[0]
	db.Where("prefecture_id = ?", r.pref.ID).Order("date").Find(&r.pref.Quantities)
	db.Where("prefecture_id = ?", r.pref.ID).Order("created_at").Find(&r.pref.ExternalLinks)

	db.Model(&r.pref).Where("id = ?", user.PrefectureID).Update("is_published", isPublished)

	return r.pref, nil
}

func (r *queryResolver) GetToken(ctx context.Context, email string, password string) (*model.Auth, error) {
	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	db.Where("email = ? AND password = ?", email, password).First(&r.users)
	if len(r.users) == 0 {
		return nil, fmt.Errorf("Authentication Error")
	}

	user := r.users[0]
	userEmail := user.Email
	userPassword := user.Password
	b := branca.NewBranca(env.GQL_SERVER_SECRETKEY)

	token, err := b.EncodeToString(userEmail + "/" + userPassword)
	if err != nil {
		return nil, fmt.Errorf("Token generation failed")
	}

	return &model.Auth{
		ID:    user.PrefectureID,
		Token: token,
	}, err
}

func (r *queryResolver) ReadPref(ctx context.Context, id string) (*model.Prefecture, error) {
	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	db.Where("id = ?", id).First(&r.prefs)
	r.pref = r.prefs[0]
	db.Where("prefecture_id = ?", r.pref.ID).Order("date").Find(&r.pref.Quantities)
	db.Where("prefecture_id = ?", r.pref.ID).Order("created_at").Find(&r.pref.ExternalLinks)

	return r.pref, nil
}

func (r *queryResolver) ReadPrefs(ctx context.Context) ([]*model.Prefecture, error) {
	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	db.Order("no").Find(&r.prefs)

	for _, pref := range r.prefs {
		db.Where("prefecture_id = ?", pref.ID).Order("date").Find(&pref.Quantities)
		db.Where("prefecture_id = ?", pref.ID).Order("created_at").Find(&pref.ExternalLinks)
	}

	return r.prefs, nil
}

func (r *queryResolver) ReadPrefAdmin(ctx context.Context) (*model.Prefecture, error) {
	//認証
	user := auth.UserEjector(ctx)
	if user == nil {
		return nil, fmt.Errorf("certification failed. Please obtain an access token and authenticate again.")
	}

	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	db.Where("id = ?", user.PrefectureID).First(&r.prefs)
	r.pref = r.prefs[0]
	db.Where("prefecture_id = ?", r.pref.ID).Order("date desc").Find(&r.pref.Quantities)
	db.Where("prefecture_id = ?", r.pref.ID).Order("created_at").Find(&r.pref.ExternalLinks)

	return r.pref, nil
}

func (r *queryResolver) ReadExternalLinksAdmin(ctx context.Context) ([]*model.ExternalLink, error) {
	//認証
	user := auth.UserEjector(ctx)
	if user == nil {
		return nil, fmt.Errorf("certification failed. Please obtain an access token and authenticate again.")
	}

	db, err := gorm.Open("postgres", env.DB_CONNECT)
	defer db.Close()
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	db.Where("prefecture_id = ?", user.PrefectureID).Order("created_at").First(&r.external_links)
	return r.external_links, nil
}

func (r *queryResolver) ReadUserEmail(ctx context.Context) (*model.User, error) {
	//認証
	user := auth.UserEjector(ctx)
	if user == nil {
		return nil, fmt.Errorf("certification failed. Please obtain an access token and authenticate again.")
	}

	return &model.User{
		Email: user.Email,
	}, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
