package com.tfg.backend.controllers;

import com.tfg.backend.models.Dieta;
import com.tfg.backend.repositories.DietaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tfg.backend.dto.GraficaDTO;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/dietes")
public class DietaController {

    @Autowired
    private DietaRepository dietaRepository;

    @PostMapping
    public Dieta afegirConsum(@RequestBody Dieta dieta) {
        return dietaRepository.save(dieta);
    }

    @GetMapping("/data")
    public ResponseEntity<List<Dieta>> obtenirPerUsuariIData(
            @RequestParam Long usuariId,
            @RequestParam String data
    ) {
        LocalDate parsedData = LocalDate.parse(data);
        List<Dieta> dietaList = dietaRepository.findByUsuariIdAndData(usuariId, parsedData);
        return ResponseEntity.ok(dietaList);
    }

    @GetMapping("/usuari/{id}")
    public List<Dieta> obtenirPerUsuari(@PathVariable Long id) {
        return dietaRepository.findByUsuariId(id);
    }

    @GetMapping("/resum/usuari/{id}")
    public List<GraficaDTO> obtenirCaloriesTotalsPerDia(@PathVariable Long id) {
        List<Dieta> dietes = dietaRepository.findByUsuariId(id);

        Map<LocalDate, Double> caloriesPerDia = new HashMap<>();

        for (Dieta dieta : dietes) {
            LocalDate dia = dieta.getData();
            double calories = dieta.getAliment() != null ? dieta.getAliment().getCalories() : 0.0;

            caloriesPerDia.merge(dia, calories, Double::sum);
        }

        return caloriesPerDia.entrySet().stream()
                .map(entry -> new GraficaDTO(entry.getKey(), entry.getValue()))
                .sorted((a, b) -> a.getData().compareTo(b.getData()))
                .collect(Collectors.toList());
    }

}
