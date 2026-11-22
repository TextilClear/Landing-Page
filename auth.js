/* =====================================================
   TEXTILCLEAR
   AUTH.JS
===================================================== */


/* =====================================================
   LOGIN
===================================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nombre =
                document
                    .getElementById("nombre")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value
                    .trim();


            const rol =
                document.querySelector(
                    'input[name="rol"]:checked'
                );


            const message =
                document.getElementById(
                    "loginMessage"
                );


            /*
             * VALIDACIONES
             */

            if (!nombre) {

                message.textContent =
                    "Escribe tu nombre.";

                return;

            }


            if (!email) {

                message.textContent =
                    "Escribe tu correo electrónico.";

                return;

            }


            if (!password) {

                message.textContent =
                    "Escribe tu contraseña.";

                return;

            }


            if (!rol) {

                message.textContent =
                    "Selecciona tu tipo de cuenta.";

                return;

            }



            /*
             * CREAR USUARIO
             */

            const usuario = {

                nombre: nombre,

                email: email,

                rol: rol.value

            };


            /*
             * GUARDAR SESIÓN
             */

            localStorage.setItem(
                "textilclear_usuario",
                JSON.stringify(usuario)
            );


            /*
             * MENSAJE
             */

            message.style.color =
                "#2f9d61";

            message.textContent =
                "Ingresando a TextilClear...";


            /*
             * REDIRECCIÓN
             */

            setTimeout(
                function () {

                    window.location.href =
                        "dashboard.html";

                },
                700
            );

        }
    );

}



/* =====================================================
   MOSTRAR / OCULTAR PASSWORD
===================================================== */

const togglePassword =
    document.getElementById(
        "togglePassword"
    );


if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        function () {

            const password =
                document.getElementById(
                    "password"
                );


            if (
                password.type ===
                "password"
            ) {

                password.type =
                    "text";

                this.textContent =
                    "🙈";

            } else {

                password.type =
                    "password";

                this.textContent =
                    "👁";

            }

        }
    );

}



/* =====================================================
   GOOGLE - DEMOSTRACIÓN
===================================================== */

const googleButton =
    document.getElementById(
        "googleButton"
    );


if (googleButton) {

    googleButton.addEventListener(
        "click",
        function () {

            const message =
                document.getElementById(
                    "loginMessage"
                );


            message.style.color =
                "#29366f";


            message.textContent =
                "La conexión con Google se implementará próximamente.";

        }
    );

}



/* =====================================================
   DASHBOARD
===================================================== */

const dashboard =
    document.querySelector(
        ".dashboard"
    );


if (dashboard) {

    const storedUser =
        localStorage.getItem(
            "textilclear_usuario"
        );


    /*
     * SI NO HAY USUARIO
     */

    if (!storedUser) {

        window.location.href =
            "login.html";

    } else {

        const usuario =
            JSON.parse(
                storedUser
            );


        const welcomeUser =
            document.getElementById(
                "welcomeUser"
            );


        const dashboardTitle =
            document.getElementById(
                "dashboardTitle"
            );


        const dashboardDescription =
            document.getElementById(
                "dashboardDescription"
            );


        const roleBadge =
            document.getElementById(
                "roleBadge"
            );


        const sellerPanel =
            document.getElementById(
                "sellerPanel"
            );


        const buyerPanel =
            document.getElementById(
                "buyerPanel"
            );


        welcomeUser.textContent =
            usuario.nombre;


        dashboardTitle.textContent =
            `Hola, ${usuario.nombre}`;



        /*
         * CONFECCIONISTA
         */

        if (
            usuario.rol ===
            "confeccionista"
        ) {

            roleBadge.textContent =
                "CONFECCIONISTA";


            dashboardDescription.textContent =
                "Administra tus lotes y vende tu sobrestock.";


            sellerPanel.classList.remove(
                "hidden"
            );


            loadSellerLots();

        }



        /*
         * COMPRADOR
         */

        if (
            usuario.rol ===
            "comprador"
        ) {

            roleBadge.textContent =
                "COMPRADOR";


            dashboardDescription.textContent =
                "Busca lotes textiles disponibles para comprar.";


            buyerPanel.classList.remove(
                "hidden"
            );


            loadBuyerLots();

        }

    }

}



/* =====================================================
   CERRAR SESIÓN
===================================================== */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "textilclear_usuario"
            );


            window.location.href =
                "index.html";

        }
    );

}



/* =====================================================
   LOTES
===================================================== */

function getLots() {

    return JSON.parse(
        localStorage.getItem(
            "textilclear_lotes"
        )
    ) || [];

}



/* =====================================================
   PUBLICAR LOTE
===================================================== */

const lotForm =
    document.getElementById(
        "lotForm"
    );


if (lotForm) {

    lotForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const lote = {

                id: Date.now(),

                nombre:
                    document.getElementById(
                        "lotName"
                    ).value.trim(),

                tipo:
                    document.getElementById(
                        "lotType"
                    ).value,

                cantidad:
                    document.getElementById(
                        "lotQuantity"
                    ).value,

                precio:
                    document.getElementById(
                        "lotPrice"
                    ).value,

                ubicacion:
                    document.getElementById(
                        "lotLocation"
                    ).value.trim(),

                descripcion:
                    document.getElementById(
                        "lotDescription"
                    ).value.trim()

            };


            const lotes =
                getLots();


            lotes.push(
                lote
            );


            localStorage.setItem(
                "textilclear_lotes",
                JSON.stringify(lotes)
            );


            document.getElementById(
                "lotMessage"
            ).textContent =
                "✓ Lote publicado correctamente.";


            lotForm.reset();


            loadSellerLots();

        }
    );

}



/* =====================================================
   MOSTRAR LOTES DEL CONFECCIONISTA
===================================================== */

function loadSellerLots() {

    const container =
        document.getElementById(
            "sellerLots"
        );


    if (!container) {

        return;

    }


    const lotes =
        getLots();


    container.innerHTML = "";


    if (
        lotes.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <strong>
                    No tienes lotes publicados
                </strong>

                <p>
                    Publica tu primer lote.
                </p>

            </div>

        `;

        return;

    }


    lotes.forEach(
        function (lote) {

            container.innerHTML += `

                <article class="lot-card">

                    <span class="lot-tag">
                        ${lote.tipo}
                    </span>

                    <h3>
                        ${lote.nombre}
                    </h3>

                    <p>
                        ${lote.descripcion}
                    </p>

                    <div class="lot-details">

                        <span>
                            📦 ${lote.cantidad} unidades
                        </span>

                        <span>
                            📍 ${lote.ubicacion}
                        </span>

                    </div>

                    <strong class="lot-price">
                        S/ ${Number(
                            lote.precio
                        ).toLocaleString(
                            "es-PE",
                            {
                                minimumFractionDigits: 2
                            }
                        )}
                    </strong>

                </article>

            `;

        }
    );

}



/* =====================================================
   MOSTRAR LOTES PARA COMPRADOR
===================================================== */

function loadBuyerLots(
    filtro = ""
) {

    const container =
        document.getElementById(
            "buyerLots"
        );


    if (!container) {

        return;

    }


    const lotes =
        getLots();


    const resultados =
        lotes.filter(
            function (lote) {

                const texto = (

                    lote.nombre +
                    " " +
                    lote.tipo +
                    " " +
                    lote.ubicacion

                ).toLowerCase();


                return texto.includes(
                    filtro.toLowerCase()
                );

            }
        );


    container.innerHTML = "";


    if (
        resultados.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <strong>
                    No hay lotes disponibles
                </strong>

                <p>
                    Todavía no se han publicado productos.
                </p>

            </div>

        `;

        return;

    }


    resultados.forEach(
        function (lote) {

            container.innerHTML += `

                <article class="lot-card">

                    <span class="lot-tag">
                        ${lote.tipo}
                    </span>

                    <h3>
                        ${lote.nombre}
                    </h3>

                    <p>
                        ${lote.descripcion}
                    </p>

                    <div class="lot-details">

                        <span>
                            📦 ${lote.cantidad} unidades
                        </span>

                        <span>
                            📍 ${lote.ubicacion}
                        </span>

                    </div>

                    <strong class="lot-price">
                        S/ ${Number(
                            lote.precio
                        ).toLocaleString(
                            "es-PE",
                            {
                                minimumFractionDigits: 2
                            }
                        )}
                    </strong>

                    <button
                        class="button button-primary buy-button"
                        onclick="verLote('${lote.nombre}')">

                        Ver lote

                    </button>

                </article>

            `;

        }
    );

}



/* =====================================================
   BUSCADOR
===================================================== */

const searchLot =
    document.getElementById(
        "searchLot"
    );


if (searchLot) {

    searchLot.addEventListener(
        "input",
        function () {

            loadBuyerLots(
                this.value
            );

        }
    );

}



/* =====================================================
   VER LOTE
===================================================== */

function verLote(
    nombre
) {

    alert(
        `Has seleccionado el lote "${nombre}".`
    );

}