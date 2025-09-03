package com.zt.framework.ioc.util;

import lombok.SneakyThrows;


public class ClsUtil {
    @SneakyThrows
    public static<T> Class<T> loadClass(String clsPath){
    return (Class<T>) Class.forName(clsPath);
    }
}
