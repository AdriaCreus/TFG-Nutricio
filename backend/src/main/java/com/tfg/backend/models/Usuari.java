package com.tfg.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "usuaris")
public class Usuari {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String email;
    private String contrasenya;
    private Double pes;
    private Double alçada;
    @JsonProperty("rol")
    private String rol;


    public Usuari() {}

    public Usuari(String nom, String email, String contrasenya, Double pes, Double alçada, String rol) {
        this.nom = nom;
        this.email = email;
        this.contrasenya = contrasenya;
        this.pes = pes;
        this.alçada = alçada;
        this.rol = rol;
    }


    public Long getId() { return id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContrasenya() { return contrasenya; }
    public void setContrasenya(String contrasenya) { this.contrasenya = contrasenya; }

    public Double getPes() { return pes; }
    public void setPes(Double pes) { this.pes = pes; }

    public Double getAlçada() { return alçada; }
    public void setAlçada(Double alçada) { this.alçada = alçada; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
