package postgresqlrepo

import (
	"context"

	"github.com/hienvl125/nimble-code-challenge/internal/itf/repo"
	"github.com/hienvl125/nimble-code-challenge/internal/model"
	"github.com/jmoiron/sqlx"
)

type userRepo struct {
	db *sqlx.DB
}

func NewUserRepo(db *sqlx.DB) repo.UserRepository {
	return &userRepo{db: db}
}

func (r userRepo) Create(ctx context.Context, newUser model.NewUser) (*model.User, error) {
	panic("Not implemented yet")
}
