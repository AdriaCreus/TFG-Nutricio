package com.tfg.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "activitats")
public class Activitat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private Double calories;

    @ManyToOne
    @JoinColumn(name = "entrenament_id")
    @JsonIgnoreProperties("activitats")
    private Entrenament entrenament;

    @ManyToOne
    @JoinColumn(name = "usuari_id")
    private Usuari usuari;

    public Activitat() {}

    public Activitat(String nom, Double calories, Entrenament entrenament, Usuari usuari) {
        this.nom = nom;
        this.calories = calories;
        this.entrenament = entrenament;
        this.usuari = usuari;
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Double getCalories() {
        return calories;
    }

    public void setCalories(Double calories) {
        this.calories = calories;
    }

    public Entrenament getEntrenament() {
        return entrenament;
    }

    public void setEntrenament(Entrenament entrenament) {
        this.entrenament = entrenament;
    }

    public Usuari getUsuari() {
        return usuari;
    }

    public void setUsuari(Usuari usuari) {
        this.usuari = usuari;
    }
}
