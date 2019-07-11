package com.funnyscreen.be.repository;

import com.funnyscreen.be.model.PageItem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PageItemRepository extends CrudRepository<PageItem, Long> {

    List<PageItem> findAll();
}
