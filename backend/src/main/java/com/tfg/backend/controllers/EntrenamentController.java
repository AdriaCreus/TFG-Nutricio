package com.tfg.backend.controllers;

import com.tfg.backend.dto.GraficaDTO;
import com.tfg.backend.models.Activitat;
import com.tfg.backend.models.Entrenament;
import com.tfg.backend.repositories.ActivitatRepository;
import com.tfg.backend.repositories.EntrenamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@RestController
@RequestMapping("/api/entrenaments")
public class EntrenamentController {

    @Autowired
    private EntrenamentRepository entrenamentRepository;

    @Autowired
    private ActivitatRepository activitatRepository;

    @PostMapping
    public Entrenament crearEntrenament(@RequestBody Entrenament entrenament) {
        Entrenament entrenamentDesat = entrenamentRepository.save(entrenament);
        if (entrenament.getActivitats() != null) {
            for (Activitat activitat : entrenament.getActivitats()) {
                activitat.setEntrenament(entrenamentDesat);
                activitatRepository.save(activitat);
            }
        }

        return entrenamentDesat;
    }

    @GetMapping
    public List<Entrenament> obtenirEntrenaments() {
        return entrenamentRepository.findAll();
    }

    @GetMapping("/usuari/{id}")
    public List<Entrenament> obtenirPerUsuari(@PathVariable Long id) {
        return entrenamentRepository.findByUsuariId(id);
    }

    @GetMapping("/data")
    public ResponseEntity<List<Entrenament>> obtenirPerUsuariIData(
            @RequestParam String data,
            @RequestParam Long usuariId) {
        LocalDate dataParsed = LocalDate.parse(data);
        List<Entrenament> llista = entrenamentRepository.findByUsuariIdAndData(usuariId, dataParsed);
        return ResponseEntity.ok(llista);
    }

    @GetMapping("/calories-mes")
    public ResponseEntity<List<GraficaDTO>> caloriesPerDiaMes(
            @RequestParam Long usuariId
    ) {
        LocalDate avui = LocalDate.now();
        LocalDate faUnMes = avui.minusDays(29);
        List<Entrenament> entrenaments = entrenamentRepository.findByUsuariIdAndDataBetween(usuariId, faUnMes, avui);
        Map<LocalDate, Double> caloriesPerDia = new TreeMap<>();
        for (Entrenament e : entrenaments) {
            double total = e.getActivitats().stream().mapToDouble(a -> a.getCalories() != null ? a.getCalories() : 0).sum();
            caloriesPerDia.merge(e.getData(), total, Double::sum);
        }
        List<GraficaDTO> result = new ArrayList<>();
        for (int i = 0; i < 30; i++) {
            LocalDate dia = faUnMes.plusDays(i);
            Double calories = caloriesPerDia.getOrDefault(dia, 0.0);
            result.add(new GraficaDTO(dia, calories));
        }
        return ResponseEntity.ok(result);
    }


}
