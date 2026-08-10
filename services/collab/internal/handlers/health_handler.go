package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/copy/collab/internal/dtos"
)

// GetHealth godoc
// @Summary      Health check
// @Description  Returns service status
// @Tags         health
// @Produce      json
// @Success      200  {object}  dtos.GetHealthResponse
// @Router       /health [get]
func GetHealth(port string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(dtos.GetHealthResponse{
			Service: "collab",
			Status:  "ok",
			Port:    port,
		})
	}
}
