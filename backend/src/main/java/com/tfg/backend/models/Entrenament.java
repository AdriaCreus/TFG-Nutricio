package com.tfg.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "entrenaments")
public class Entrenament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;
    private Double duracio;

    @ManyToOne
    @JoinColumn(name = "usuari_id")
    private Usuari usuari;

    @OneToMany(mappedBy = "entrenament", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("entrenament")
    private List<Activitat> activitats;

    public Entrenament() {}

    public Entrenament(LocalDate data, Double duracio, Usuari usuari) {
        this.data = data;
        this.duracio = duracio;
        this.usuari = usuari;
    }

    public Long getId() { return id; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public Double getDuracio() { return duracio; }
    public void setDuracio(Double duracio) { this.duracio = duracio; }
    public Usuari getUsuari() { return usuari; }
    public void setUsuari(Usuari usuari) { this.usuari = usuari; }
    public List<Activitat> getActivitats() { return activitats; }
    public void setActivitats(List<Activitat> activitats) { this.activitats = activitats; }
}
