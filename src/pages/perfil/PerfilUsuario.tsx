import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"


export const PerfilUsuario: React.FC = ({ }) => {
    return (
        <LayoutBaseDePagina
            titulo="Perfil do usuário"
            barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
        >






        </LayoutBaseDePagina>
    )
}
