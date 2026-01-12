package net.ausiasmarch.gesportin.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import net.ausiasmarch.gesportin.entity.PagoEntity;


public interface PagoRepository extends JpaRepository<PagoEntity, Long> {
    
    Page<PagoEntity> findByPublicadoTrue(Pageable oPageable);

    Page<PagoEntity> findByPublicadoFalse(Pageable oPageable);

    PagoEntity findByIdAndPublicadoTrue(Long id);
}
