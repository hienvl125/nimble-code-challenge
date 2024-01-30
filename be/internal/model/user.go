package model

type User struct {
	ID             string `db:"id"`
	Email          string `db:"email"`
	HashedPassword string `db:"hashed_password"`
}

type NewUser struct {
	Email    string
	Password string
}
