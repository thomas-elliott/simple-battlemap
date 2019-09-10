package com.github.thomaselliott.simplebattlemap.model;

import org.junit.Assert;
import org.junit.Test;

import static org.junit.Assert.*;

public class AssetTypeTest {
    @Test
    public void fromString() {
        AssetType uppercase = AssetType.fromString("TOKEN");
        AssetType lowercase = AssetType.fromString("token");
        AssetType mixedcase = AssetType.fromString("Token");
        Assert.assertEquals(AssetType.TOKEN, uppercase);
        Assert.assertEquals(AssetType.TOKEN, lowercase);
        Assert.assertEquals(AssetType.TOKEN, mixedcase);
    }

    @Test
    public void valueOf() {
        AssetType uppercase = AssetType.valueOf("TOKEN");
        //AssetType lowercase = AssetType.valueOf("token");
        //AssetType mixedcase = AssetType.valueOf("Token");
        Assert.assertEquals(AssetType.TOKEN, uppercase);
        //Assert.assertEquals(AssetType.TOKEN, lowercase);
        //Assert.assertEquals(AssetType.TOKEN, mixedcase);
    }
}
