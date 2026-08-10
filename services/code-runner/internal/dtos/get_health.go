package dtos

type GetHealthResponse struct {
	Service string `json:"service" example:"code-runner"`
	Status  string `json:"status" example:"ok"`
	Port    string `json:"port" example:"8005"`
}
