const templateCode =

`// Test this sample or try out your own Cow-BASIC code!
// this code runs in ~4000 iterations as opposed to ~10^15
a = 1
b = 1
100000 MOO {
    100000 MOO {
        100000 MOO {
            b = b + a + a + 1
            a = a + 1
        }
        a = b + a + 23
    }
    b = b + b + a + 1
}
RETURN b
`


export default templateCode
