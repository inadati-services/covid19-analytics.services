package graph

import "gqlkit/graph/model"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	prefs []*model.Prefecture
	pref *model.Prefecture
	quantities []*model.Quantity
	quantity *model.Quantity
	users []*model.User
	user *model.User
	external_links []*model.ExternalLink
	external_link *model.ExternalLink
}
