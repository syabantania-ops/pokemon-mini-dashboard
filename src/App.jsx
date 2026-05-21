import { useEffect, useState } from 'react'
import axios from 'axios'
import PokemonCard from './components/PokemonCard'
import AddPokemonForm from './components/AddPokemonForm'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    fetchPokemon()
  }, [])

  const fetchPokemon = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=20'
      )

      const results = response.data.results

      const pokemonData = await Promise.all(
        results.map(async (item) => {
          const detail = await axios.get(item.url)

          return {
            id: detail.data.id,
            name: detail.data.name,
            image: detail.data.sprites.other['official-artwork'].front_default,
            types: detail.data.types.map((type) => type.type.name),
          }
        })
      )

      setPokemon(pokemonData)
    } catch (err) {
      setError('Gagal mengambil data Pokemon. Periksa koneksi internet.')
    } finally {
      setLoading(false)
    }
  }

  const pokemonTypes = [
    'all',
    ...new Set(pokemon.flatMap((poke) => poke.types)),
  ]

  const filteredPokemon = pokemon.filter((poke) => {
    const matchSearch = poke.name.toLowerCase().includes(search.toLowerCase())
    const matchType =
      selectedType === 'all' || poke.types.includes(selectedType)

    return matchSearch && matchType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <header className="px-6 py-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
          React API Project
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          Pokemon Mini Dashboard
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
          Aplikasi React yang terintegrasi dengan PokeAPI untuk menampilkan data
          Pokemon secara responsif, modern, dan interaktif.
        </p>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-12">
        {loading && (
          <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl font-bold text-blue-300">
              Loading Pokemon...
            </h2>
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-10 text-center shadow-2xl backdrop-blur-md">
            <h2 className="text-xl font-bold text-red-300">{error}</h2>

            <button
              onClick={fetchPokemon}
              className="mt-5 rounded-full bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && (
          <section>
            <AddPokemonForm />

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold">Daftar Pokemon</h2>
                <p className="mt-1 text-slate-300">
                  Menampilkan {filteredPokemon.length} dari {pokemon.length} data Pokemon.
                </p>
              </div>

              <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-300">
                API Connected
              </span>
            </div>

            <div className="mb-8 grid gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-md md:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-semibold uppercase tracking-widest text-blue-300">
                  Search Pokemon
                </label>

                <input
                  type="text"
                  placeholder="Cari Pokemon, contoh: charmander..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold uppercase tracking-widest text-blue-300">
                  Filter Type
                </label>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-white outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20"
                >
                  {pokemonTypes.map((type) => (
                    <option key={type} value={type} className="bg-slate-900">
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredPokemon.length === 0 ? (
              <div className="rounded-3xl border border-yellow-400/30 bg-yellow-500/10 p-10 text-center">
                <h2 className="text-xl font-bold text-yellow-300">
                  Pokemon tidak ditemukan.
                </h2>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPokemon.map((poke) => (
                  <PokemonCard key={poke.id} pokemon={poke} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default App