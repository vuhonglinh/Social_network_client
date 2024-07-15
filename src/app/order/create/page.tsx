"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import http from "@/http/Http";
import { PropsCity, PropsCommune, PropsDistrict } from "@/type/order.type";
import { useForm, FormProvider } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaOrder } from "@/schema/order.schema";
import { Input } from "@/components/ui/input";

export default function CreateOrder() {
    const [citys, setCitys] = useState<PropsCity[] | []>([]); //Thành phố
    const [districts, setDistricts] = useState<PropsDistrict[] | []>([]); //Huyện
    const [communes, setCommunes] = useState<PropsCommune[] | null>([]); //Xã

    const [city, setCity] = useState<PropsCity | null>(null); //Thành phố
    const [district, setDistrict] = useState<PropsDistrict | null>(null); //Huyện
    const [commune, setCommune] = useState<PropsCommune | null>(null); //Xã

    const formMethods = useForm<any>({
        resolver: zodResolver(formSchemaOrder),
        defaultValues: {
            username: "",
        },
    });

    useEffect(() => {
        http.get("http://127.0.0.1:8000/api/get-city").then((response) => {
            return response.data;
        }).then((response) => {
            setCitys(response.data);
        });
    }, []);

    useEffect(() => {
        if (city) {
            http.get(`http://127.0.0.1:8000/api/get-district?province_id=${city.ProvinceID}`)
                .then((response) => {
                    return response.data;
                }).then((response) => {
                    setDistricts(response.data);
                });
        }
    }, [city]);

    useEffect(() => {
        if (district) {
            http.get(`http://127.0.0.1:8000/api/get-commune?district_id=${district.DistrictID}`)
                .then((response) => {
                    return response.data;
                }).then((response) => {
                    setCommunes(response.data);
                });
        }
    }, [district]);

    return (
        <div className="justify-center items-center px-[200px]">
            <h1 className="flex justify-center items-center my-3">Tạo đơn hàng</h1>
            <FormProvider {...formMethods}>
                <form className="space-y-8">
                    <FormField
                        control={formMethods.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên khách hàng</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên khách hàng" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center items-center gap-10">
                        <FormField
                            control={formMethods.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={(value) => {
                                        const selectedCity = citys?.find((city) => city.ProvinceID === parseInt(value));
                                        setCity(selectedCity || null);
                                    }}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Chọn tỉnh" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {citys?.map((city) => (
                                                <SelectItem key={city.ProvinceID} value={String(city?.ProvinceID)}>{city?.ProvinceName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formMethods.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={(value) => {
                                        const data = districts?.find((district) => district.DistrictID === parseInt(value));
                                        setDistrict(data || null);
                                    }}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Chọn huyện" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {districts?.map((district) => (
                                                <SelectItem key={district.DistrictID} value={String(district.DistrictID)}>{district.DistrictName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={formMethods.control}
                            name="commune"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={(value) => {
                                        const data = communes?.find((commune) => commune.WardCode === parseInt(value));
                                        setCommune(data || null);
                                    }}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Chọn xã" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {communes?.map((commune) => (
                                                <SelectItem key={commune.WardCode} value={String(commune.WardCode)}>{commune.WardName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </FormProvider>
        </div>
    );
}
