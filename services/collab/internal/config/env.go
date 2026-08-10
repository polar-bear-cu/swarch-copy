package config

import "os"

func Port() string {
	if p := os.Getenv("COLLAB_PORT"); p != "" {
		return p
	}
	return "8004"
}
