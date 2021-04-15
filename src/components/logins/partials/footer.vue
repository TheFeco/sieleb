<template>
    <div class="footer">
        <v-footer padless
            class="white--text"
        >
            <v-col fluid 
                class="dg-background p-3"
            >
                <div class="d-flex justify-center py-1">
                    <h5>Desarrollado por: D.T.E.  <font class="text-dark"><b><v-icon>mdi-copyright </v-icon> 2021</b></font></h5>
                </div>

            </v-col>
        </v-footer>
    </div>
</template>
<style>
    .dg-background{ background:-webkit-gradient(linear, 80% 20%, 10% 21%, from(#FFBE00), to(#FF4E28)) }
    .footer { width: 100%; position: fixed; bottom: 0px;  z-index: 10; }
</style>