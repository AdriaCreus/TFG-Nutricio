package com.tfg.backend.controllers;

import com.tfg.backend.models.Activitat;
import com.tfg.backend.repositories.ActivitatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activitats")
public class ActivitatController {

    @Autowired
    private ActivitatRepository activitatRepository;

    @GetMapping
    public List<Activitat> obtenirActivitats() {
        return activitatRepository.findAll();
    }

    @PostMapping
    public Activitat crearActivitat(@RequestBody Activitat activitat) {
        return activitatRepository.save(activitat);
    }

    @PutMapping("/{id}")
    public Activitat actualitzarActivitat(@PathVariable Long id, @RequestBody Activitat activitatActualitzada) {
        return activitatRepository.findById(id).map(act -> {
            act.setNom(activitatActualitzada.getNom());
            act.setCalories(activitatActualitzada.getCalories());
            return activitatRepository.save(act);
        }).orElseThrow(() -> new RuntimeException("Activitat no trobada"));
    }



}
