package repo

import (
	"context"

	"github.com/hienvl125/nimble-code-challenge/internal/model"
)

type UserRepository interface {
	Create(context.Context, model.NewUser) (*model.User, error)
}
