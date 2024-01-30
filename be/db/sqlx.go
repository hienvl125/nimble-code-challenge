package db

import (
	"fmt"

	"github.com/hienvl125/nimble-code-challenge/config"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func NewPostgreSqlx(conf *config.Config) (*sqlx.DB, error) {
	db, err := sqlx.Connect("postgres", fmt.Sprintf(
		"postgresql://%s:%s@%s:%d/%s?sslmode=disable", // DSN: postgresql://user:password@host:port/db_name?sslmode=disable
		conf.DBUser,
		conf.DBPass,
		conf.DBHost,
		conf.DBPort,
		conf.DBName,
	))
	if err != nil {
		return nil, err
	}
	return db, nil
}
