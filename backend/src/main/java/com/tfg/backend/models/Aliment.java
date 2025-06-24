package com.tfg.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "aliments")
public class Aliment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private Double calories;
    private Double proteines;
    private Double hidrats;
    private Double greixos;

    @ManyToOne
    @JoinColumn(name = "usuari_id")
    private Usuari usuari;


    public Aliment() {}


    public Aliment(String nom, Double calories, Double proteines, Double hidrats, Double greixos, Usuari usuari) {
        this.nom = nom;
        this.calories = calories;
        this.proteines = proteines;
        this.hidrats = hidrats;
        this.greixos = greixos;
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

    public Double getProteines() {
        return proteines;
    }

    public void setProteines(Double proteines) {
        this.proteines = proteines;
    }

    public Double getHidrats() {
        return hidrats;
    }

    public void setHidrats(Double hidrats) {
        this.hidrats = hidrats;
    }

    public Double getGreixos() {
        return greixos;
    }

    public void setGreixos(Double greixos) {
        this.greixos = greixos;
    }

    public Usuari getUsuari() {
        return usuari;
    }

    public void setUsuari(Usuari usuari) {
        this.usuari = usuari;
    }
}

