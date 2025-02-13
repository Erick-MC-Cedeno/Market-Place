// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    total_balance: "Total Balance",
                    language_selection: "Language Selection",
                    language: "Language",
                    address: "Address",
                    balance: "Balance",
                    view_details: "View Details",
                    account: "Account",
                    welcome: "Welcome, {{firstName}} {{lastName}}",
                    deposit: "Deposit",
                    withdraw: "Withdraw",
                    security: "Security",
                    my_wallets: "My Wallets",
                    account_security: "The security of your account is our priority. Make sure to enable two-factor authentication.",
                    crypto_potential: "With cryptocurrencies, you can save and earn more returns. Discover the potential of your money!",
                    p2p_service: "Use our P2P service to sell your tokens for fiat quickly and securely.",
                    blockchain_revolution: "Blockchain is a revolutionary technology that enables secure and transparent transactions.",
                    password_security: "Remember that keeping your passwords secure and unique is essential.",
                    crypto_wallet_services: "Our crypto wallet services are designed to provide you with maximum security and ease of use.",
                    p2p_exchange_service: "Our P2P exchange service allows you to transact directly with other users.",
                    // Nuevos textos traducibles
                    account_security_message: "The security of your account is our priority. Make sure to enable two-factor authentication.",
                    crypto_potential_message: "With cryptocurrencies, you can save and earn more returns. Discover the potential of your money!",
                    p2p_service_message: "Use our P2P service to sell your tokens for fiat quickly and securely.",
                    blockchain_revolution_message: "Blockchain is a revolutionary technology that enables secure and transparent transactions.",
                    password_security_message: "Remember that keeping your passwords secure and unique is essential.",
                    crypto_wallet_services_message: "Our crypto wallet services are designed to provide you with maximum security and ease of use.",
                    p2p_exchange_service_message: "Our P2P exchange service allows you to transact directly with other users.",
                    total_balance_title: "Total Balance",
                    total_balance_amount: "balance of all your cryptocurrencies",
                    wallets_link_text: "Select Wallet",
                    // Wallets texts
                    p2p_service_wallets: "Use our P2P service to buy and sell tokens directly between users.",
                    rpc_description: "The RPC (Remote Procedure Call) is the communication channel between your wallet and the blockchain.",
                    password_security_wallets: "Remember that keeping your passwords secure and unique is essential.",
                    evm_wallet_description: "Our EVM-based crypto wallet is designed to provide you with security and ease of use.",
                    deposit_button: "DEPOSIT",
                    withdraw_button: "WITHDRAW",
                    back_button: "BACK",
                    your_wallets_title: "Your Wallets",
                    // Nuevos textos agregados
                    insufficient_funds: "Insufficient funds",
                    loading: "Loading...",
                    address_copied: "Address copied!",
                    copy: "Copy",
                    deposits: "Deposits",
                    withdrawals: "Withdrawals",
                    amount_to_withdraw: "Amount to withdraw...",
                    commission: "Fee: {{fee}} {{coin}}",
                    create_wallet: "CREATE WALLET FOR {{walletId}} NOW",
                    address_placeholder: "Address {{network}}...",
                    your_address: "Your address for {{coin}} ({{network}})",
                    // Nuevos textos traducibles
                    user_profile: "Profile",
                    change_password: "Password",
                    two_factor_auth: "2FA",
                    language_selector: "Language",
                    verify_email: "Email",
                    settings_title: "Settings",
                    go_back: "Go Back",
                },
            },
            es: {
                translation: {
                    total_balance: "Balance Total",
                    language_selection: "Selección de Idioma",
                    language: "Idioma",
                    address: "Dirección",
                    balance: "Balance",
                    view_details: "Ver Detalles",
                    account: "Cuenta",
                    welcome: "Bienvenido, {{firstName}} {{lastName}}",
                    deposit: "Depositar",
                    withdraw: "Retirar",
                    security: "Seguridad",
                    my_wallets: "Mis Wallet",
                    account_security: "La seguridad de tu cuenta es nuestra prioridad. Asegúrate de habilitar la autenticación de dos factores.",
                    crypto_potential: "Con las criptomonedas, puedes ahorrar y obtener más rendimientos. ¡Descubre el potencial de tu dinero!",
                    p2p_service: "Utiliza nuestro servicio P2P para vender tus tokens por fiat de manera rápida y segura.",
                    blockchain_revolution: "La blockchain es una tecnología revolucionaria que permite transacciones seguras y transparentes.",
                    password_security: "Recuerda que mantener tus contraseñas seguras y únicas es fundamental.",
                    crypto_wallet_services: "Nuestros servicios de crypto wallet están diseñados para ofrecerte la máxima seguridad y facilidad de uso.",
                    p2p_exchange_service: "Nuestro servicio de intercambio P2P te permite realizar transacciones directamente con otros usuarios.",
                    // Nuevos textos traducibles
                    account_security_message: "La seguridad de tu cuenta es nuestra prioridad. Asegúrate de habilitar la autenticación de dos factores.",
                    crypto_potential_message: "Con las criptomonedas, puedes ahorrar y obtener más rendimientos. ¡Descubre el potencial de tu dinero!",
                    p2p_service_message: "Utiliza nuestro servicio P2P para vender tus tokens por fiat de manera rápida y segura.",
                    blockchain_revolution_message: "La blockchain es una tecnología revolucionaria que permite transacciones seguras y transparentes.",
                    password_security_message: "Recuerda que mantener tus contraseñas seguras y únicas es fundamental.",
                    crypto_wallet_services_message: "Nuestros servicios de crypto wallet están diseñados para ofrecerte la máxima seguridad y facilidad de uso.",
                    p2p_exchange_service_message: "Nuestro servicio de intercambio P2P te permite realizar transacciones directamente con otros usuarios.",
                    total_balance_title: "Balance Total",
                    total_balance_amount: "total de todas tus criptomonedas",
                    wallets_link_text: "Selecciona una wallet",
                    // Wallets texts
                    p2p_service_wallets: "Utiliza nuestro servicio P2P para comprar y vender tokens directamente entre usuarios.",
                    rpc_description: "El RPC (Remote Procedure Call) es el canal de comunicación entre tu wallet y la blockchain.",
                    password_security_wallets: "Recuerda que mantener tus contraseñas seguras y únicas es fundamental.",
                    evm_wallet_description: "Nuestra crypto wallet basada en tecnología EVM está diseñada para brindarte seguridad, facilidad de uso.",
                    deposit_button: "DEPOSITAR",
                    withdraw_button: "RETIRAR",
                    back_button: "REGRESAR",
                    your_wallets_title: "Tus Billeteras",
                    // Nuevos textos agregados
                    insufficient_funds: "Fondos insuficientes",
                    loading: "Cargando...",
                    address_copied: "Dirección copiada!",
                    copy: "Copiar",
                    deposits: "Depósitos",
                    withdrawals: "Retiros",
                    amount_to_withdraw: "Monto a retirar...",
                    commission: "Comisión: {{fee}} {{coin}}",
                    address_placeholder: "Dirección {{network}}...",
                    create_wallet: "CREAR BILLETERA PARA {{walletId}} AHORA",
                    your_address: "Tu dirección de {{coin}} ({{network}})",
                    // Nuevos textos traducibles
                    user_profile: "Perfil",
                    change_password: "Contraseña",
                    two_factor_auth: "2FA",
                    language_selector: "Idioma",
                    verify_email: "Email",
                    settings_title: "Configuración",
                    go_back: "Regresar",
                },
            },
        },
        lng: 'es', 
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
