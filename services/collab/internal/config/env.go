package config

import (
	"os"

	"github.com/joho/godotenv"
)

func init() {
	_ = godotenv.Load("../../.env")
}

func Port() string {
	if p := os.Getenv("COLLAB_PORT"); p != "" {
		return p
	}
	return "8004"
}
