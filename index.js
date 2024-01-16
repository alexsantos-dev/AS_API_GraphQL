import { gql, ApolloServer } from "apollo-server";

const flings = [
    {
        id: 1,
        nome: "Kalin",
        sexo: "F",
        ativo: true
    },
    {
        id: 2,
        nome: "Dawn",
        sexo: "F",
        ativo: false
    },
    {
        id: 3,
        nome: "Deton",
        sexo: "M",
        ativo: true
    }
]
const resolvers = {
    Query: {
        id() {
            let dataAtual = new Date()
            let dataFormatada = dataAtual.toISOString().slice(0, 10);
            return dataFormatada;
        },
        usuarios() {
            return flings;
        },
        usuario(_, args) {
            const { id, nome } = args;
            if (id) return flings.find((usuario) => usuario.id === id)
            return flings.find((usuario) => usuario.nome === nome)
        }
    }
}
const typeDefs = gql`
    type Usuario {
        id: Int
        nome: String
        sexo: String
        ativo: Boolean 
        }
    

    type Query {
        id: ID
        nome: String
        email: String
        sexo: String
        usuarios: [Usuario]
        usuario(id: Int, nome: String): Usuario
        array: [String]!
    }
`

const server = new ApolloServer({
    typeDefs,
    resolvers
})
const PORT = 3000;
server.listen(PORT).then(({ url }) => {
    console.log(`Servidor ativo: ${url}`);
}); 
