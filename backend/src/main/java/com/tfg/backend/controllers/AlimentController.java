package com.tfg.backend.controllers;

import com.tfg.backend.models.Aliment;
import com.tfg.backend.repositories.AlimentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aliments")
public class AlimentController {

    @Autowired
    private AlimentRepository alimentRepository;

    @GetMapping
    public List<Aliment> obtenirAliments() {
        return alimentRepository.findAll();
    }

    @PostMapping
    public Aliment crearAliment(@RequestBody Aliment aliment) {
        return alimentRepository.save(aliment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aliment> actualitzarAliment(@PathVariable Long id, @RequestBody Aliment actualitzat) {
        return alimentRepository.findById(id)
                .map(aliment -> {
                    aliment.setNom(actualitzat.getNom());
                    aliment.setCalories(actualitzat.getCalories());
                    aliment.setProteines(actualitzat.getProteines());
                    aliment.setHidrats(actualitzat.getHidrats());
                    aliment.setGreixos(actualitzat.getGreixos());
                    return ResponseEntity.ok(alimentRepository.save(aliment));
                })
                .orElse(ResponseEntity.notFound().build());
    }


}
