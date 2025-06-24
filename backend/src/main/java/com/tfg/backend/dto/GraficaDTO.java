package com.tfg.backend.dto;

import java.time.LocalDate;

public class GraficaDTO {
    private LocalDate data;
    private Double caloriesTotals;

    public GraficaDTO(LocalDate data, Double caloriesTotals) {
        this.data = data;
        this.caloriesTotals = caloriesTotals;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Double getCaloriesTotals() {
        return caloriesTotals;
    }

    public void setCaloriesTotals(Double caloriesTotals) {
        this.caloriesTotals = caloriesTotals;
    }
}
