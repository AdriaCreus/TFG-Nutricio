package com.tfg.backend.repositories;
import com.tfg.backend.models.Entrenament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EntrenamentRepository extends JpaRepository<Entrenament, Long> {
    List<Entrenament> findByUsuariId(Long usuariId);
    List<Entrenament> findByUsuariIdAndData(Long usuariId, LocalDate data);
    List<Entrenament> findByUsuariIdAndDataBetween(Long usuariId, LocalDate inici, LocalDate fi);

}
