package com.tfg.backend.repositories;
import com.tfg.backend.models.Dieta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface DietaRepository extends JpaRepository<Dieta, Long> {
    List<Dieta> findByUsuariIdAndData(Long usuariId, LocalDate data);
    List<Dieta> findByUsuariId(Long usuariId);

}
