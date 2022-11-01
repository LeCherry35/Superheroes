import HeroService from "../services/HeroService"
import { createFormData } from "../helpers/createFormData"

export const addHeroAsync = async (hero, image) => {
    const formData = createFormData(hero,image)
    const res = await HeroService.addHero(formData)
    console.log(`${res.data.nickname} succesfully added to database`);
    
}
export const editHeroAsync = async (id, hero, image) => {
    const formData = createFormData(hero, image)
    const res = await HeroService.editHero(id, formData)
    console.log(`${res.data.nickname} succesfully edited`);
}
export const deleteHeroAsync = async (id) => {
    const res = await HeroService.deleteHero(id)
    console.log(`${res.data.nickname} succesfully deleted`);
}
export const getHeroAsync = async (id) => {
    const res = await HeroService.getHero(id)
    return res
}
