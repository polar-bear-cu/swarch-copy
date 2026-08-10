package dtos

type GetHealthResponse struct {
	Service string `json:"service" example:"collab"`
	Status  string `json:"status" example:"ok"`
	Port    string `json:"port" example:"8004"`
}
