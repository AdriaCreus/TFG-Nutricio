package com.tfg.backend.controllers;

import com.tfg.backend.models.Usuari;
import com.tfg.backend.repositories.UsuariRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuaris")
public class UsuariController {

    @Autowired
    private UsuariRepository usuariRepository;


    @GetMapping
    public List<Usuari> obtenirTots() {
        return usuariRepository.findAll();
    }

    @PostMapping
    public Usuari crearUsuari(@RequestBody Usuari usuari) {
        return usuariRepository.save(usuari);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dadesLogin) {
        String email = dadesLogin.get("email");
        String contrasenya = dadesLogin.get("contrasenya");

        Usuari usuari = usuariRepository.findByEmail(email);

        if (usuari == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuari no trobat.");
        }

        if (!usuari.getContrasenya().equals(contrasenya)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contrasenya incorrecta.");
        }

        return ResponseEntity.ok(usuari);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Usuari> obtenirUsuariPerId(@PathVariable Long id) {
        return usuariRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Usuari actualitzarUsuari(@PathVariable Long id, @RequestBody Usuari usuariActualitzat) {
        return usuariRepository.findById(id).map(u -> {
            u.setNom(usuariActualitzat.getNom());
            u.setEmail(usuariActualitzat.getEmail());
            u.setPes(usuariActualitzat.getPes());
            u.setAlçada(usuariActualitzat.getAlçada());
            u.setRol(usuariActualitzat.getRol());
            return usuariRepository.save(u);
        }).orElseThrow(() -> new RuntimeException("Usuari no trobat"));
    }

    @DeleteMapping("/{id}")
    public void eliminarUsuari(@PathVariable Long id) {
        usuariRepository.deleteById(id);
    }


}
