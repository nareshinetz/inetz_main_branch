package com.admin.api.repository;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.admin.api.entity.Batch;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {

    // Staff time conflict
    @Query("""
        SELECT b FROM Batch b
        JOIN b.staffs s
        WHERE s.id IN :staffIds
        AND (:start < b.endTime AND :end > b.startTime)
    """)
    List<Batch> staffTimeConflict(
        List<Long> staffIds,
        LocalTime start,
        LocalTime end
    );

    // Room time conflict
    @Query("""
        SELECT b FROM Batch b
        WHERE b.roomNumber = :room
        AND (:start < b.endTime AND :end > b.startTime)
    """)
    List<Batch> roomTimeConflict(
        String room,
        LocalTime start,
        LocalTime end
    );
}
