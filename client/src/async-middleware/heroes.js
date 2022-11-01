import HeroService from "../services/HeroService"
export const getHeroesAsync = async (q, page) => {
    const res = await HeroService.getHeroes(q, page)
      const newHeroes = res.data
      const n = await HeroService.getHeroesNumber()
      return {newHeroes, all: (q*(page + 1) < n.data) ? false : true}
}