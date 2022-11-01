import HeroService from "../services/HeroService"


export const addHeroAsync = async (hero, image) => {
    const formData =new FormData()
    if(image) formData.append('image', image)
    if(hero.nickname) formData.append('nickname', hero.nickname)
    if(hero.superpowers) formData.append('superpowers', hero.superpowers)
    if(hero.real_name) formData.append('real_name', hero.real_name)
    if(hero.origin_description) formData.append('origin_description', hero.origin_description)
    if(hero.catch_phrase) formData.append('catch_phrase', hero.catch_phrase)
    const res = await HeroService.addHero(formData)
    console.log(`${res.data.nickname} succesfully added to database`);
    
}
export const editHeroAsync = async (id, hero, image) => {
    const formData =new FormData()
    if(image) formData.append('image', image)
    if(hero.nickname) formData.append('nickname', hero.nickname)
    if(hero.superpowers) formData.append('superpowers', hero.superpowers)
    if(hero.real_name) formData.append('real_name', hero.real_name)
    if(hero.origin_description) formData.append('origin_description', hero.origin_description)
    if(hero.catch_phrase) formData.append('catch_phrase', hero.catch_phrase)
    const res = await HeroService.editHero(id, formData)
    console.log(`${res.data.nickname} succesfully edited`);
}
export const deleteHeroAsync = async (id) => {
    const res = await HeroService.deleteHero(id)
    console.log(`${res.data.nickname} succesfully deleted`);
}
