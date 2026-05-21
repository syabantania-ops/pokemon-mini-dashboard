export default function PokemonCard({ pokemon }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:bg-white/20 hover:shadow-2xl">
      
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="h-full w-full bg-gradient-to-br from-blue-500/10 to-cyan-400/10"></div>
      </div>

      <div className="relative z-10">
        
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
            #{pokemon.id}
          </span>

          <span className="text-xs uppercase tracking-widest text-slate-400">
            Pokemon
          </span>
        </div>

        <div className="mt-5 flex items-center justify-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="h-36 w-36 drop-shadow-2xl transition duration-300 group-hover:scale-110 group-hover:rotate-2"
          />
        </div>

        <div className="mt-5 text-center">
          <h2 className="text-2xl font-extrabold capitalize tracking-wide">
            {pokemon.name}
          </h2>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-medium text-cyan-200"
              >
                {type}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Status
              </p>

              <h3 className="mt-1 font-bold text-green-300">
                Active
              </h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-xs uppercase tracking-widest text-slate-400">
                API
              </p>

              <h3 className="mt-1 font-bold text-blue-300">
                Connected
              </h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}