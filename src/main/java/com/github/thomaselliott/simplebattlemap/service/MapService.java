package com.github.thomaselliott.simplebattlemap.service;

import com.github.thomaselliott.simplebattlemap.model.Asset;
import com.github.thomaselliott.simplebattlemap.model.BattleMap;
import com.github.thomaselliott.simplebattlemap.model.BattleMapUpdateRequest;
import com.github.thomaselliott.simplebattlemap.repository.MapRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Optional;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MapService {
    private MapRepository mapRepository;

    @Autowired
    public MapService(MapRepository mapRepository) {
        this.mapRepository = mapRepository;
    }

    public Page<BattleMap> listMaps(Pageable pageable) {
        Page<BattleMap> maps = mapRepository.findAll(pageable);
        return maps;
    }

    public BattleMap getMap(Long id) {
        Optional<BattleMap> map = mapRepository.findById(id);
        return map.orElse(null);
    }

    public BattleMap loadMap(Long id) {
        Optional<BattleMap> map = mapRepository.findById(id);

        return map.orElse(null);
    }

    @Transactional
    public void newMap(Asset backgroundImage) {
        BattleMap battleMap = new BattleMap();
        battleMap.setBackgroundImage(backgroundImage);
        mapRepository.save(battleMap);
    }

    @Transactional
    public void saveMap(BattleMap map) {
        mapRepository.save(map);
    }

    @Transactional
    public BattleMap updateMap(BattleMap battleMap, BattleMapUpdateRequest mapUpdate) {
        Long id = mapUpdate.getId();
        if (battleMap == null || !battleMap.getId().equals(id)) {
            throw new IllegalArgumentException("Map null or does not match");
        }

        // Update only the settings
        if (!StringUtils.isEmpty(mapUpdate.getName())) {
            battleMap.setName(mapUpdate.getName());
        }

        battleMap.setGridHeight(mapUpdate.getGridHeight());
        battleMap.setGridWidth(mapUpdate.getGridWidth());
        battleMap.setGridLineWidth(mapUpdate.getGridLineWidth());

        return mapRepository.save(battleMap);
    }

    @Transactional
    public boolean deleteMap(Long id) {
        Optional<BattleMap> map = mapRepository.findById(id);
        if (map.isPresent()) {
            mapRepository.delete(map.get());
            return true;
        } else {
            return false;
        }
    }
}
