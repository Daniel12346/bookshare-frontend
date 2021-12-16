import { ReactComponent as Loader } from "images/gql_loader.svg"
import styled, { keyframes } from "styled-components"


const rotate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}`

export default styled(Loader)`
    animation: ${rotate} 1.2s infinite;
    height: 50px;
    fill: blue;
    width: 50px;
`
