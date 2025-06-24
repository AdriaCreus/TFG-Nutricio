package com.tfg.backend.repositories;
import com.tfg.backend.models.Usuari;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuariRepository extends JpaRepository<Usuari, Long> {
    Usuari findByEmail(String email);
}
