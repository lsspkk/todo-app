# Opiskellaan reduxia

Miten näytetään loading indicator tälle: items/getItems/pending

Miten render sivulle latautumisen jälkeen.
Miksi todo -> done ei päivity itemiin ellei avaa, sulje jotain menua..
Koska jos haluat reagoida storen päivitykseen tarvii käyttää hookkia:
const { items } = useAppSelector((state) => state.items)

# Lisänä storybook

      npm run storybook

https://storybook.js.org/docs/react/writing-stories/introduction

# Muuta

Vaihdettu VITE webpackin ja create-react-appin tilalle

Vaatii nodejs 16

# TODO

- poista focus kun klikkaa enteriä ja tallettaa item nimen muutokset
- arrow-down-on-square lisäysnappulaksi
- drag-and-drop
