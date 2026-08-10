package main

import (
	"fmt"
	"net/http"

	"github.com/copy/collab/internal/config"
	"github.com/copy/collab/internal/handlers"
)

// @title        CoPy Collab Service
// @version      1.0
// @host         localhost:8004
// @BasePath     /
func main() {
	port := config.Port()

	http.HandleFunc("/docs.json", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "docs/swagger.json")
	})

	http.HandleFunc("/health", handlers.GetHealth(port))

	// TODO: gRPC server :8003
	// TODO: WebSocket server :8004

	fmt.Printf("[collab] :%s\n", port)
	http.ListenAndServe(":"+port, withCORS(http.DefaultServeMux))
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
