package com.funnyscreen.be.service.impl;

import com.funnyscreen.be.model.PageItem;
import com.funnyscreen.be.repository.PageItemRepository;
import com.funnyscreen.be.service.PageItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageItemServiceImpl implements PageItemService
{
    private final PageItemRepository pageItemRepository;

    @Autowired
    public PageItemServiceImpl(PageItemRepository pageItemRepository) {
        this.pageItemRepository = pageItemRepository;
    }

    public List<PageItem> findAllPageItems() {
        return pageItemRepository.findAll();
    }
}
