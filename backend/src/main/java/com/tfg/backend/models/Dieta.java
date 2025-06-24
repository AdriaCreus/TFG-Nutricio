package com.tfg.backend.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "dietes")
public class Dieta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;
    private Double quantitat;

    @ManyToOne
    @JoinColumn(name = "aliment_id")
    private Aliment aliment;

    @ManyToOne
    @JoinColumn(name = "usuari_id")
    private Usuari usuari;


    public Dieta() {}

    public Dieta(LocalDate data, Double quantitat, Aliment aliment, Usuari usuari) {
        this.data = data;
        this.quantitat = quantitat;
        this.aliment = aliment;
        this.usuari = usuari;
    }



    public Long getId() {
        return id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Double getQuantitat() {
        return quantitat;
    }

    public void setQuantitat(Double quantitat) {
        this.quantitat = quantitat;
    }

    public Aliment getAliment() {
        return aliment;
    }

    public void setAliment(Aliment aliment) {
        this.aliment = aliment;
    }

    public Usuari getUsuari() {
        return usuari;
    }

    public void setUsuari(Usuari usuari) {
        this.usuari = usuari;
    }
}
