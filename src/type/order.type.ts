

export type PropsCity = {
    ProvinceID: number,
    ProvinceName: string,
    CountryID: number,
    Code: number,
}

export type PropsDistrict = {
    DistrictID: number,
    ProvinceID: number,
    DistrictName: string,
    Code: number,
}

export type PropsCommune = {
    WardCode: number,
    DistrictID: number,
    WardName: string,
}