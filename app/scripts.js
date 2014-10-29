'use strict';
// jquery-play-sound / jquery.playSound.js
//Playing sound notifications using Javascript?
//$.playSound('http://example.org/sound.mp3');
(function($){

    $.extend({
        playSound: function(){
            return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='true' loop='false' class='playSound'>" +
                "<audio autoplay='autoplay' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /><source src='"+arguments[0]+".ogg' /></audio>").appendTo('body');
        }
    });

})(jQuery);

String.prototype.insert = function (index, string) {
    //console.log(string);
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};
if (!Array.prototype.indexOf)
{
    /**
     * Add array.indexOf() functionality (exists in >FF 1.5 but not in IE)
     *
     * @param {Object} elem Element to find.
     * @param {Number} [from] Position in array to look from.
     */
    Array.prototype.indexOf = function(elem /*, from*/) {
        var len = this.length;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
            from += len;
        }

        for (; from < len; from++) {
            if (from in this && this[from] === elem) {
                return from;
            }
        }

        return -1;
    };
}
if (!Array.prototype.remove)
{
    /**
     * Add array.remove() convenience method to remove element from array.
     *
     * @param {Object} elem Element to remove.
     */
    Array.prototype.remove = function(elem) {
        var index = this.indexOf(elem);
        alert(index);
        if (index !== -1) {
            this.splice(index, 1);
        }
    };
}
function getCookie(name) {
    var parts = document.cookie.split(name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

var myApp= angular.module('myApp', ['ngFx',

        'ngRoute',
        'ui.router',
        'ngResource',
        'ngCookies',
        'ui.bootstrap',
        'caco.ClientPaginate',
        'btford.socket-io',
        'ui.select2',
        'i.mongoPaginate',
        'ngAutocomplete',
        'myApp.controllers',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
    'FB',

        'pascalprecht.translate',
        'dialogs.main'

])



.run(['$rootScope', '$state', '$stateParams','Config','global','globalSrv',
        '$cookieStore','$resource','User','$window',"socket",'Category','$http','$location','Auth',
        function ($rootScope,   $state,   $stateParams,Config,global,globalSrv,
                  $cookieStore,$resource,User,$window,socket,Category,$http,$location,Auth){


            global.set('country',{country_code:'UA'});
            global.set('currency',"UAH");
            global.set('rate',1);
           /* globalSrv.getData('filter').then(function(response){
                global.set('filter',response.data);
            })*/
            globalSrv.getData('filterTags').then(function(response){
                global.set('filterTags',response.data);
            });
            /*globalSrv.getData('country').then(function(response){
                global.set('country',response.data);
                if (response.data && response.data.country_code){
                    if (response.data.country_code=='RU' ||response.data.country_code=='RUS'){
                        global.set('currency',"RUB");
                    } else if (response.data.country_code=='UA'){
                        global.set('currency',"UAH");
                    }
                    else {
                        global.set('currency',"USD");
                    }
                }

            })
*/


            $rootScope.lang=getCookie('lan');
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.socket = socket;


            $rootScope.user=null;

            $rootScope.titles={};
            $rootScope.commonFilter={"tags":['xx','xx','xx']};
            /*$rootScope.config=Config.get(function(res){
                $rootScope.commonFilter.tags=res.tags;
                $rootScope.currencyIndex=0;
                $rootScope.currency='UAH';

                $http.get('/api/getip').success(function (data, status, headers, config) {
                   //console.log(data);
                    if (data && data.country_code){
                        if (data.country_code=='RU' ||data.country_code=='RUS'){
                            $rootScope.currency="RUB";
                            $rootScope.countryRUB=true;
                        } else if (data.country_code=='UA'){
                            $rootScope.currency="UAH";
                            $rootScope.countryUAH=true;
                        }
                        else {
                            $rootScope.currency="USD";
                            $rootScope.countryUSD=true;
                        }
                    }
                }).error(function (data, status, headers, config) {})

            });*/
            /*$rootScope.slides=[];
            Category.list(function(res){
                $rootScope.categories=res;
                if($rootScope.categories[0]){
                    $rootScope.mainSection=$rootScope.categories[0]._id;
                    for (var i=0,l=$rootScope.categories.length;i<l;i++){
                        if ($rootScope.categories[i].section==$rootScope.mainSection){
                            $rootScope.slides[$rootScope.slides.length]={
                                    img:$rootScope.categories[i].img,
                                    name:$rootScope.categories[i].name[$rootScope.lang],
                                    url:$rootScope.categories[i]._id,
                                    lang:$rootScope.lang
                            }
                        }

                    }
                }


            });*/
            $rootScope.changeStuff=false;

            $rootScope.$on('$stateChangeStart', function(event, to, toParams, fromState, fromParams){

                if ($rootScope.lang=='ru'){
                    $rootScope.titles.pageTitle='Платья оптом и в розницу от украинского производителя Jadone fashion - платья, туники, сарафаны.';
                    $rootScope.titles.pageKeyWords=
                        " платья оптом производителя украинского, оптом женский трикотаж, купить, украина, интернет магазин, опт, оптовый, модная женская одежда, женские юбки оптом, " +
                            "женские платья , сарафаны, женские костюмы, кардиганы, розница , туники " +
                            " платья французский трикотаж, купить, оптом, беларусь, мода, стиль, россия, казахстан, фабрика, оптом купить"+
                            'стильная одежда, женская одежда оптом и в розницу, красивая одежда';
                    $rootScope.titles.pageDescription='Jadone fashion  – сайт для оптовых и розничных покупателей  женской одежлы от  украинского производителя Jadone fashion. ' +
                        'Здесь Вы можете купить стильные и красивые женские платья , сарафаны, костюмы, кардиганы и туники, выполненные из качественных тканей.';

                }
                if (((to.name=='language.login' || to.name=='language.signup') &&Auth.isLoggedIn())||
                    (to.name=='language.customOrder' && !Auth.isLoggedIn())){
                    //console.log(toParams);
                    $rootScope.$state.transitionTo('language.home',{'lang':toParams.lang});
                }
            });

            $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                if ($window.ga)
                    $window.ga('send', 'pageview', { page: $location.path() });
                $('.zoomContainer').remove();


                if(to.name=='language.stuff' && from.name=='language.stuff.detail'){
                    $rootScope.changeStuff=true;
                }

            });
}])

.config(['$stateProvider', '$urlRouterProvider','$locationProvider','dialogsProvider','$translateProvider','globalProvider',function ($stateProvider,$urlRouterProvider,$locationProvider,dialogsProvider,$translateProvider,globalProvider){


        globalProvider.setUrl( {
            country : '/api/getip/',
            //config : '/api/config/',
            //categories : '/api/collections/Category/',
            //brands : '/api/collections/Brand/',
            user:'/api/users/me/',
            filter:'/api/filters/',
            filterTags:'/api/tag/all/'
        });


        // инициализация глобальных переменных
        globalProvider.set('config');
        globalProvider.set('user');
        globalProvider.set('country','UA');
        globalProvider.set('currency',"UAH");
        globalProvider.set('categories');
        globalProvider.set('brands');
        globalProvider.set('titles');
        globalProvider.set('stats');
        globalProvider.set('filters');
        globalProvider.set('filterTags');
        globalProvider.set('rate');

            dialogsProvider.useBackdrop('static');
            dialogsProvider.useEscClose(true);
            dialogsProvider.useCopy(false);
            dialogsProvider.setSize('sm');

            $translateProvider.translations('ru',{
                DIALOGS_ERROR: "Ошибка",
                DIALOGS_ERROR_MSG: "Se ha producido un error desconocido.",
                DIALOGS_CLOSE: "Закрыть",
                DIALOGS_PLEASE_WAIT: "Espere por favor",
                DIALOGS_PLEASE_WAIT_ELIPS: "Espere por favor...",
                DIALOGS_PLEASE_WAIT_MSG: "Esperando en la operacion para completar.",
                DIALOGS_PERCENT_COMPLETE: "% Completado",
                DIALOGS_NOTIFICATION: "Уведомление",
                DIALOGS_NOTIFICATION_MSG: "Notificacion de aplicacion Desconocido.",
                DIALOGS_CONFIRMATION: "Confirmacion",
                DIALOGS_CONFIRMATION_MSG: "Подтвердите",
                DIALOGS_OK: "Ок",
                DIALOGS_YES: "Да",
                DIALOGS_NO: "Нет"
            });
            $translateProvider.preferredLanguage('ru');



        var lang=getCookie('lan');
        if (!lang || (lang!='en'&& lang!='ru')) {
            lang='ru';
            document.cookie = "lan=ru;path=/";
        }






        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        $urlRouterProvider
            .when('/', '/'+lang+'/home')
            .otherwise('/');


    $stateProvider
        .state("language", {
            url: "/:lang",
            abstract:true,
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/mainFrame.html' }
            //controller: 'mainFrameCtrl'
        })
        .state("language.home", {
            url: "/home",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/home.html' },
            controller: 'homeCtrl'
        })
        .state("language.login", {
            url: "/login",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/login.html' },
            controller: 'loginCtrl'
        })
        .state("language.signup", {
            url: "/signup?email",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/signup.html' },
            controller: 'signupCtrl'
        })

        .state("language.customOrder", {
            url: "/customorder?num",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/customorder.html' },
            controller:'customOrderCtrl',
onEnter: ['Auth','$rootScope',function (Auth,$rootScope) {
                console.log(Auth.isLoggedIn());
                if (!Auth.isLoggedIn()){
                    console.log($rootScope.$stateParams.lang);
                    //$rootScope.$state.transitionTo('language.customOrder',{'lang':$rootScope.$stateParams.lang});
                }
            }]

        })
        .state("language.profile", {
            url: "/profile",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/profile.html' },
            controller:'profileCtrl'
        })

        .state("language.settings", {
            url: "/settings",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/settings.html' },
            controller: 'settingsCtrl'
        })
        .state("language.contacts", {
            url: "/contacts",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/contacts.html' },
            controller: 'contactsCtrl'
        })
        .state("language.searchStuff", {
            url: "/searchStuff?searchStr",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/stuff.search.html' },
            controller: 'searchStuffCtrl'
        })
        .state("language.stuffSale", {
            url: "/stuffsale?sale",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/stuff.search.html' },
            controller: 'saleStuffCtrl'
        })
        .state("language.stuff.detail", {
            //url: "/:stuffName/:id/:color?size",
            url: "/stuffdetail/:id/:color?size",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/stuff.detail.html' },
            controller: 'stuffDetailCtrl'
        })

        .state("language.stuff", {
            //url: "/:categoryName/оптом-от-производителя/:category?searchStr?scrollTo",
            url: "/stuff/category/:category?searchStr?scrollTo",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/stuff.html' },
            controller: 'stuffCtrl'
        })
        .state("language.cart", {
            url: "/cart",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/cart.html' },
            controller: 'cartCtrl'
        })

        .state("language.news.detail", {
            url: "/newsdetail/:id",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/news.detail.html' },
            controller: 'newsDetailCtrl'
        })

        .state("language.news", {
            url: "/news",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/news.html' },
            controller: 'newsCtrl'
        })
        .state("language.chat", {
            url: "/chat",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/chat.html' },
            controller: 'chatCtrl'
        })
        .state("language.aboutus", {
            url: "/aboutus",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/about_us_company.html' }
//controller:'homeCtrl'
        })
        .state("language.delivery", {
            url: "/delivery",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/about_us_delivery.html' },
            controller:'deliveryCtrl'
        })
        .state("language.payment", {
            url: "/payment",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/about_us_payment.html' },
            controller:'paymentCtrl'
        })
        .state("language.pay", {
            url: "/pay?num&sum&currency?desc?kurs",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/pay.html' },
            controller:'payCtrl'
        })
        .state("language.help", {
            url: "/help",
            templateUrl: function(stateParams){ return 'views/partials/'+stateParams.lang+'/help.html' },
            //controller:'payCtrl'
        });

 /*.state("language.searchStuff", {
           // url: "/searchstuff?searchStr",
            url:"/ssss",
            templateUrl: function(stateParam){ return 'views/partials/'+stateParams.lang+'/stuff.search.html' }
            //controller: 'searchStuffCtrl'
        })*/



}]);


angular.module('caco.ClientPaginate', [])

    .filter('paginate', function(Paginator) {
        return function(input, rowsPerPage) {
            /*console.log(input);
             console.log(input.length);*/
            if (!input)
                return;
            if (!input.length) {
                return input;
            }

            if (rowsPerPage) {
                Paginator.rowsPerPage = rowsPerPage;
            }

            Paginator.itemCount = input.length;

            return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
        }
    })

    .filter('forLoop', function() {
        return function(input, start, end) {
            input = new Array(end - start);
            for (var i = 0; start < end; start++, i++) {
                input[i] = start;
            }

            return input;
        }
    })

    .service('Paginator', function ($rootScope) {
        this.page = 0;
        this.rowsPerPage = 54;
        this.itemCount = 0;

        this.setPage = function (page) {
            if (page > this.pageCount()) {
                return;
            }

            this.page = page;
        };

        this.nextPage = function () {
            if (this.isLastPage()) {
                return;
            }

            this.page++;
        };

        this.perviousPage = function () {
            if (this.isFirstPage()) {
                return;
            }

            this.page--;
        };

        this.firstPage = function () {
            this.page = 0;
        };

        this.lastPage = function () {
            this.page = this.pageCount() - 1;
        };

        this.isFirstPage = function () {
            return this.page == 0;
        };

        this.isLastPage = function () {
            return this.page == this.pageCount() - 1;
        };

        this.pageCount = function () { var count = Math.ceil(parseInt(this.itemCount, 10) / parseInt(this.rowsPerPage, 10)); if (count === 1) { this.page = 0; } return count;
        };
        /*this.pageCount = function () {
         return Math.ceil(parseInt(this.itemCount) / parseInt(this.rowsPerPage));
         };*/
    })

    .directive('paginator', function factory() {
        return {
            restrict:'E',
            controller: function ($scope, Paginator) {
                $scope.paginator = Paginator;
            },
            templateUrl: 'paginationControl.html'
        };
    })


.directive('mongoPaginatorAll', function () {
    return {
        restrict:'E',
        scope :{
            page:'=',
            row:'=',
            rowsPerPage :'@',
            totalItems:'=',
            hideRow:'@'
        },
        link: function (scope, element, attrs, controller) {
            scope.paginator={};
            scope.paginator.page=0;
            scope.paginator.itemCount=0;
            scope.row=scope.paginator.rowsPerPage=scope.rowsPerPage;


            scope.paginator.setPage = function (page) {
                if (page > scope.paginator.pageCount()) {
                    return;
                }
                scope.paginator.page = page;
            };
            scope.paginator.nextPage = function () {
                if (scope.paginator.isLastPage()) {
                    return;
                }
                scope.paginator.page++;
            };
            scope.paginator.perviousPage = function () {
                if (scope.paginator.isFirstPage()) {
                    return;
                }
                scope.paginator.page--;
            };
            scope.paginator.firstPage = function() {
                scope.paginator.page = 0;
            };
            scope.paginator.lastPage = function () {
                scope.paginator.page = scope.paginator.pageCount() - 1;
            };
            scope.paginator.isFirstPage = function () {
                return scope.paginator.page == 0;
            };
            scope.paginator.isLastPage = function () {
                return scope.paginator.page == scope.paginator.pageCount() - 1;
            };
            scope.paginator.pageCount = function () {
                var count = Math.ceil(parseInt(scope.paginator.itemCount, 10) / parseInt(scope.paginator.rowsPerPage, 10)); if (count === 1) { scope.paginator.page = 0; }
                //console.log( count);
                return count;
            };
            scope.$watch('totalItems',function(n,o){
                scope.paginator.itemCount=scope.totalItems;
            });
            scope.$watch("paginator.page",function(n,o){
                scope.page=scope.paginator.page;
            })
        },
        templateUrl: 'manager/views/templates/mongoPaginationControlAll.html'
    };
});


angular.module('btford.socket-io', []).
    provider('socketFactory', function () {

        // when forwarding events, prefix the event name
        var defaultPrefix = 'socket:',
            ioSocket;

        // expose to provider
        this.$get = function ($rootScope, $timeout) {

            var asyncAngularify = function (socket, callback) {
                return callback ? function () {
                    var args = arguments;
                    $timeout(function () {
                        callback.apply(socket, args);
                    }, 0);
                } : angular.noop;
            };

            return function socketFactory (options) {
                options = options || {};
                var socket = options.ioSocket || io.connect();

                var prefix = options.prefix || defaultPrefix;
                var defaultScope = options.scope || $rootScope;

                var addListener = function (eventName, callback) {
                    socket.on(eventName, asyncAngularify(socket, callback));
                };

                var wrappedSocket = {
                    on: addListener,
                    addListener: addListener,
                    socket : socket,
                    emit: function (eventName, data, callback) {
                        return socket.emit(eventName, data, asyncAngularify(socket, callback));
                    },

                    removeListener: function () {
                        return socket.removeListener.apply(socket, arguments);
                    },

                    // when socket.on('someEvent', fn (data) { ... }),
                    // call scope.$broadcast('someEvent', data)
                    forward: function (events, scope) {
                        if (events instanceof Array === false) {
                            events = [events];
                        }
                        if (!scope) {
                            scope = defaultScope;
                        }
                        events.forEach(function (eventName) {
                            var prefixedEvent = prefix + eventName;
                            var forwardBroadcast = asyncAngularify(socket, function (data) {
                                scope.$broadcast(prefixedEvent, data);
                            });
                            scope.$on('$destroy', function () {
                                socket.removeListener(eventName, forwardBroadcast);
                            });
                            socket.on(eventName, forwardBroadcast);
                        });
                    }
                };

                return wrappedSocket;
            };
        };
    });

angular.module('i.mongoPaginate', [])

    .filter('paginate', function(Paginator) {
        return function(input, rowsPerPage) {
            /*console.log(input);
             console.log(input.length);*/
            if (!input)
                return;
            if (!input.length) {
                return input;
            }

            if (rowsPerPage) {
                Paginator.rowsPerPage = rowsPerPage;
            }

            Paginator.itemCount = input.length;

            return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
        }
    })

    .filter('forLoop', function() {
        return function(input, start, end) {
            input = new Array(end - start);
            for (var i = 0; start < end; start++, i++) {
                input[i] = start;
            }

            return input;
        }
    })

    .service('mongoPaginator', function (global) {
        this.page = 0;
        this.rowsPerPage = 20;
        this.itemCount = 0;

        //this.pageCount =13

        this.setPage = function (page) {
            if (page > this.pageCount()) {
                return;
            }

            this.page = page;
            notifyObservers();
        };

        this.nextPage = function () {
            if (this.isLastPage()) {
                return;
            }

            this.page++;
            notifyObservers();

        };

        this.perviousPage = function () {
            if (this.isFirstPage()) {
                return;
            }

            this.page--;
            notifyObservers();
        };

        this.firstPage = function () {
            this.page = 0;
            notifyObservers();
        };

        this.lastPage = function () {
            this.page = this.pageCount() - 1;
            notifyObservers();
        };

        this.isFirstPage = function () {
            return this.page == 0;
            notifyObservers();
        };

        this.isLastPage = function () {
            return this.page == this.pageCount() - 1;
            notifyObservers();
        };

        this.pageCount = function () {
            //console.log(this.itemCount);
            var count = Math.ceil(parseInt(this.itemCount, 10) / parseInt(this.rowsPerPage, 10)); if (count === 1) { this.page = 0; }
            //console.log( count);
            return count;
        };

//http://stackoverflow.com/questions/12576798/angularjs-how-to-watch-service-variables

        var observerCallbacks = [];

        //register an observer
        this.registerObserverCallback = function(callback){
            observerCallbacks.push(callback);
        };

        //call this when you know 'foo' has been changed
        var notifyObservers = function(){
            angular.forEach(observerCallbacks, function(callback){
                callback();
            });
        };

    })

    .directive('mongoPaginator', function factory() {
        return {
            restrict:'E',
            controller: function ($scope, mongoPaginator) {
                $scope.paginator = mongoPaginator;
            },
            templateUrl: 'manager/views/templates/mongoPaginationControl.html'
        };
    });



/**
 * A directive for adding google places autocomplete to a text box
 * google places autocomplete info: https://developers.google.com/maps/documentation/javascript/places
 *
 * Simple Usage:
 *
 * <input type="text" ng-autocomplete="result"/>
 *
 * creates the autocomplete text box and gives you access to the result
 *
 *   + `ng-autocomplete="result"`: specifies the directive, $scope.result will hold the textbox result
 *
 *
 * Advanced Usage:
 *
 * <input type="text" ng-autocomplete="result" details="details" options="options"/>
 *
 *   + `ng-autocomplete="result"`: specifies the directive, $scope.result will hold the textbox autocomplete result
 *
 *   + `details="details"`: $scope.details will hold the autocomplete's more detailed result; latlng. address components, etc.
 *
 *   + `options="options"`: options provided by the user that filter the autocomplete results
 *
 *      + options = {
 *           types: type,        string, values can be 'geocode', 'establishment', '(regions)', or '(cities)'
 *           bounds: bounds,     google maps LatLngBounds Object
 *           country: country    string, ISO 3166-1 Alpha-2 compatible country code. examples; 'ca', 'us', 'gb'
 *         }
 *
 *
 *
 *
 *
 */



//angular.module('dialogs.services', ['ui.bootstrap.modal'])


angular.module( "ngAutocomplete", [])
    .directive('ngAutocomplete1', function($parse,$timeout) {
        return {

            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?',
                fromList: '=',
                cityId:   '=',
                countryId:'='
            },

            link: function(scope, element, attrs, model) {

                //options for autocomplete
                //console.log(scope.ngModel);
                $timeout(function(){
                    element[0].value=scope.ngModel;
                });

                //console.log(element);
                var opts;
               // scope.options.types='cities';
                //convert options provided to opts
                var initOpts = function() {
                    opts = {};
                   // console.log(scope.options);
                    if (scope.options) {
                        if (scope.options.types) {
                            opts.types = [];
                            //console.log(scope.options.types);
                            opts.types.push(scope.options.types)
                        }
                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds
                        }
                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: scope.options.country
                            }
                        }
                    }

                };
                initOpts();

                element.bind('blur', function () {
                    //console.log(scope.ngModel);
                    //console.log(scope.cityId);
                    $timeout(function(){
                        scope.cityId='';
                    });


                    //console.log(scope.cityId);
                });

                //create new autocomplete
                //reinitializes on every change of the options provided
                var newAutocomplete = function() {
                    var options = {
                        types: ['(cities)']
                    };

                    scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
                    google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                        scope.$apply(function() {
//              if (scope.details) {
                            scope.details = scope.gPlace.getPlace();
                            console.log(scope.details);
                            //scope.cityId=scope.details.
//              }           console.log();
                            if(scope.details.address_components && scope.details.address_components.length ){
                                 for (var i= 0,l=scope.details.address_components.length;i<l;i++){
                                     var c=scope.details.address_components[i];
                                     if (c.types && c.types[0] && c.types[0]=='country'){
                                         console.log(scope.details.address_components[i].short_name);
                                         scope.countryId=scope.details.address_components[i].short_name;
                                     }
                                 }
                            }


                            if (scope.details && scope.details.types && scope.details.types[0]=='locality'){

                                $timeout(function(){
                                    scope.ngModel=scope.ngAutocomplete = element.val();

                                    scope.cityId=scope.details.place_id;
                                },100)
                            }


                        });
                    })
                };
                newAutocomplete();
                /*scope.$watch('ngModel', function (n) {
                    console.log(n);
                });*/

                //watch options provided to directive
                scope.watchOptions = function () {
                    return scope.options
                };
                scope.$watch(scope.watchOptions, function () {
                    initOpts();
                    newAutocomplete();
                    element[0].value = '';
                    scope.ngAutocomplete = element.val();
                }, true);
            }
        };
    })


    .directive('ngAutocomplete', function() {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?',
                fromList: '='
            },

            link: function(scope, element, attrs, controller) {

                //options for autocomplete
                scope.fromList=false;
                var opts;
                var watchEnter = false;
                //convert options provided to opts
                var initOpts = function() {

                    opts = {};
                    if (scope.options) {

                        watchEnter = scope.options.watchEnter === true;

                        if (scope.options.types) {
                            opts.types = [];
                            opts.types.push(scope.options.types);
                            scope.gPlace.setTypes(opts.types)
                        } else {
                            scope.gPlace.setTypes([])
                        }

                        if (scope.options.bounds) {
                            opts.bounds = scope.options.bounds;
                            scope.gPlace.setBounds(opts.bounds)
                        } else {
                            scope.gPlace.setBounds(null)
                        }

                        if (scope.options.country) {
                            opts.componentRestrictions = {
                                country: scope.options.country
                            };
                            scope.gPlace.setComponentRestrictions(opts.componentRestrictions)
                        } else {
                            scope.gPlace.setComponentRestrictions(null)
                        }
                    }
                };

                if (scope.gPlace == undefined) {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                }

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    var result = scope.gPlace.getPlace();
                    if (result !== undefined) {
                        if (result.address_components !== undefined) {

                            scope.$apply(function() {

                                scope.details = result;

                                controller.$setViewValue(element.val());
                            });
                        }
                        else {
                            if (watchEnter) {
                                getPlace(result)
                            }
                        }
                    }
                });

                //function to get retrieve the autocompletes first result using the AutocompleteService
                var getPlace = function(result) {
                    var autocompleteService = new google.maps.places.AutocompleteService();
                    if (result.name.length > 0){
                        autocompleteService.getPlacePredictions(
                            {
                                input: result.name,
                                offset: result.name.length
                            },
                            function listentoresult(list, status) {
                                if(list == null || list.length == 0) {

                                    scope.$apply(function() {
                                        scope.details = null;
                                    });

                                } else {
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails(
                                        {'reference': list[0].reference},
                                        function detailsresult(detailsResult, placesServiceStatus) {

                                            if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function() {

                                                    controller.$setViewValue(detailsResult.formatted_address);
                                                    element.val(detailsResult.formatted_address);

                                                    scope.details = detailsResult;

                                                    //on focusout the value reverts, need to set it again.
                                                    var watchFocusOut = element.on('focusout', function(event) {
                                                        element.val(detailsResult.formatted_address);
                                                        element.unbind('focusout')
                                                    })

                                                });
                                            }
                                        }
                                    );
                                }
                            });
                    }
                };

                controller.$render = function () {
                    var location = controller.$viewValue;
                    element.val(location);
                };

                //watch options provided to directive
                scope.watchOptions = function () {
                    return scope.options
                };
                scope.$watch(scope.watchOptions, function () {
                    initOpts()
                }, true);

            }
        };
    })

angular.module('FB', []).directive('fbLike', function($timeout) {
    return {
        restrict: 'A',
        scope: {},
        template: "<div class=\"fb-like-box\" data-href=\"{{page}}\" data-width=\"{{width}}\" data-show-faces=\"{{faces}}\" data-height=\"{{height}}\" data-stream=\"{{stream}}\" data-header=\"{{header}}\"></div>",
        link: function($scope, $element, $attrs) {
            console.log('link');
            var working, _ref, _ref1;
            $scope.page = $attrs.fbLike;
            $scope.height = (_ref = $attrs.fbHeight) != null ? _ref : '550';
            $scope.faces = $attrs.fbFaces != null ? $attrs.fbFaces : 'false';
            $scope.stream = $attrs.fbStream != null ? $attrs.fbStream : 'true';
            $scope.header = $attrs.fbHeader != null ? $attrs.fbHeader : 'false';
            $scope.width = (_ref1 = $attrs.fbWidth) != null ? _ref1 : $element.parent().width();
            working = false;
            $(window).on('resize', function() {
                if (!working) {
                    working = true;
                    $timeout(function() {
                        $scope.width = $element.parent().width();
                        $timeout(function() {
                            return FB.XFBML.parse($element[0]);
                        }, 50, false);
                        working = false;
                    }, 10);
                }
            });
        }
    };
});
'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  })

 .directive('mongooseError', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.on('keydown', function() {
                return ngModel.$setValidity('mongoose', true);
            });
        }
    };
})


    .directive('pswdCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pswdCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val()===$(firstPassword).val();
                        console.log(v);

                        ctrl.$setValidity('pswdmatch', v);
                        console.log(ctrl);
                    });
                });
            }
        }
    }])

.directive("uiSrefParams", function($state) {
    return {
        link: function(scope, elm, attrs) {
            var params;
            params = scope.$eval(attrs.uiSrefParams);
            //console.log(params);
            return elm.bind("click", function(e) {
                var button;
                console.log(params);
                if (!angular.equals($state.params, params)) {
                    button = e.which || e.button;
                    if ((button === 0 || button === 1) && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                        scope.$evalAsync(function() {
                            return $state.go(".", params);
                        });
                        return e.preventDefault();
                    }
                }
            });
        }
    };
})
    //http://www.befundoo.com/university/tutorials/angularjs-directives-tutorial/
    // http://tympanus.net/codrops/2011/09/12/elastislide-responsive-carousel/
    .directive('galleryForZoom', function($compile,$timeout) {
        return {
            restrict: 'A',
            scope:{
                galleryForZoom:'=',
                onPhotoSelected: '&'},
            link: function(scope, element, attrs) {
                scope.$watch('galleryForZoom',function(oldVal,newVal){
                    if (oldVal==newVal) return;
                    linkElastislide(oldVal);
                });

                function linkElastislide(galArr){
                    if (galArr.length>2){
                        var galul =angular.element('<ul id="carousel2"  class="elastislide-list"></ul>');
                        for(var i=0;i<galArr.length;i++){
                            galul.append("<li><a  ng-click='toggle("+i+")' data-image='"+galArr[i].thumb+"'  data-zoom-image='"
                                +galArr[i].img+"'><img id='img_"+i+"'  src='"+galArr[i].thumb+"' /></a></li>");
                        }
                        var el= $compile(galul)(scope);
                        element.parent().append(el);
                        $timeout(function(){
                            $('#carousel2').elastislide();
                        },50);


                    /*$.Elastislide.defaults = {
                        // orientation 'horizontal' || 'vertical'
                        orientation : 'horizontal',

                        // sliding speed
                        speed : 1000,

                        // sliding easing
                        //easing : 'ease-in-out',

                        // the minimum number of items to show.
                        // when we resize the window, this will make sure minItems are always shown
                        // (unless of course minItems is higher than the total number of elements)
                        //minItems : 3,
                        imageW  : 200,  // the images width
                        minItems : 5,
                        margin  : 0,
                        easing  : 'jswing',
                        border  : 0,

                        // index of the current item (left most item of the carousel)
                        start : 0,

                        // click item callback
                        onClick : function( el, position, evt ) {
                           *//* $('#carousel2 a').removeClass('active').eq(index).addClass('active');
                            scope.onPhotoSelected({newIndex: position});*//*
                            return false; },
                        onReady : function() { return false; },
                        onBeforeSlide : function() { return false; },
                        onAfterSlide : function() { return false; }
                    };*/
                    //console.log($.Elastislide.defaults);

                }
                }
                scope.toggle = function(index) {
                    $('#carousel2 a').removeClass('active').eq(index).addClass('active');
                    scope.onPhotoSelected({newIndex: index});
                };
            }
        }
    })


.directive('ngElevateZoom', function($compile) {
    return {
        restrict: 'A',
        scope: {
            galleryZoom: '='
        },
        link: function(scope, element, attrs) {

            scope.$watch('galleryZoom',function(oldVal,newVal){
                if (oldVal==newVal) return;
                linkElevateZoom(oldVal);
            });
            /*attrs.$observe('src',function(srcAttribute){
                console.log("$observe : " +srcAttribute);
            })*/
            function linkElevateZoom(galArr){
                if (!attrs.zoomImage || !attrs.galleryZoom ) return;
                element.attr('data-zoom-image',attrs.zoomImage);
                var galDiv = angular.element("<div id='gallery_022'></div>");
                for(var i=0;i<galArr.length;i++){
                    galDiv.append("<a  data-image='"+galArr[i].thumb+"' data-zoom-image='"
                        +galArr[i].img+"'></li>");
                }
                element.parent().append(galDiv);
                $(element).elevateZoom({
                    gallery:'gallery_022',
                    zoomType : "inner",
                    //cursor: "crosshair",
                    //easing : true,
                    cursor: 'pointer',
                    //galleryActiveClass: 'active',
                    imageCrossfade: true,
                    //loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif',
                    zoomWindowWidth:500,
                    zoomWindowHeight:652,
                    responsive:true
                });

            }
       }
    };
})

    //http://www.sitepoint.com/creating-slide-show-plugin-angularjs/
.directive('myslider', function($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            images: '=images'
        },
        link: function(scope, elem, attrs) {
            //console.log(scope.images);
            scope.$watch('currentIndex', function() {
                scope.images.forEach(function(image) {
                    image.visible = false; // make every image invisible
                });

                scope.images[scope.currentIndex].visible = true; // make the current image visible
            });

            scope.currentIndex = 0; // Initially the index is at the first image

            scope.next = function() {
                scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };

            scope.prev = function() {
                scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            };
            scope.pick = function(i) {
                scope.currentIndex =i;
                console.log(scope.currentIndex);
            };

            var timer;
            var sliderFunc = function() {
                timer = $timeout(function() {
                    scope.next();
                    timer = $timeout(sliderFunc, 3000);
                }, 3000);
            };

            sliderFunc();

            scope.$on('$destroy', function() {
                $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
            });
        },
        templateUrl: 'views/templates/slides.html'
    };
})

    //Angular directive to scroll to a given item
    //http://stackoverflow.com/questions/12790854/angular-directive-to-scroll-to-a-given-item

    .directive('scrollIf', function () {
        return function (scope, element, attributes) {

            setTimeout(function () {
                if (scope.$eval(attributes.scrollIf)) {
                    //console.log(attributes.scrollIf);
                    //console.log(element[0].offsetTop);
                    /*console.log(element.parent().parent())
                    var div = document.getElementById('divElem');
                    console.log(document.getElementById('divElem'))*/
                    var div=element.parent().parent();
                    div.scrollTop(div.scrollTop()+element.position().top);
                    //div.scrollTop(div.scrollTop()+element[0].position().top);




                }
            });
        }
    })


//Angularjs directive to Insert text at textarea caret
    //http://plnkr.co/edit/Xx1SHwQI2t6ji31COneO?p=preview

    //Why is ngModel.$setViewValue(…) not working from
//http://stackoverflow.com/questions/15269737/why-is-ngmodel-setviewvalue-not-working-from
.directive('myText', ['$rootScope', function($rootScope) {
    return {
        restrict : 'A', // only activate on element attribute
        require : '?ngModel', // get a hold of NgModelController
        scope: {
            model: '=ngModel'
        },
        link: function(scope, element, attrs) {
            scope.$watch('model', function() {
                scope.$eval(attrs.ngModel + ' = model');
            });

            scope.$watch(attrs.ngModel, function(val) {
                scope.model = val;
            });

            $rootScope.$on('add', function(e, val) {
                var domElement = element[0];

                if (document.selection) {

                    domElement.focus();
                    var sel = document.selection.createRange();
                    sel.text = val;
                    scope.model=domElement.value;
                    domElement.focus();
                } else if (domElement.selectionStart || domElement.selectionStart === 0) {

                    var startPos = domElement.selectionStart;
                    var endPos = domElement.selectionEnd;
                    var scrollTop = domElement.scrollTop;
                    domElement.value = domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length);
                    scope.model=domElement.value;
                    //scope.$apply();
                    domElement.focus();
                    domElement.selectionStart = startPos + val.length;
                    domElement.selectionEnd = startPos + val.length;
                    domElement.scrollTop = scrollTop;
                } else {

                    domElement.value += val;
                    scope.model=domElement.value;
                    domElement.focus();
                }
               // scope.$apply();

            });
        }
    }
}])

    .directive('focusMe', function($timeout) {
        return {
            scope: { trigger: '=focusMe' },
            link: function(scope, element) {
                scope.$watch('trigger', function(value) {
                    //console.log('dd');
                    if(value === true) {
                        //console.log('trigger',value);
                        //$timeout(function() {
                        //console.log(element[0]);
                        $timeout(function(){element[0].focus()},50);
                        //element[0].focus();
                        //scope.trigger = false;
                        //});
                    }
                });
            }
        };
    })


    .directive('setModel', function($timeout) {
        return {
            restrict : 'A', // only activate on element attribute
            require : '?ngModel', // get a hold of NgModelController
            scope: {
                model: '=ngModel'
            },

            link: function(scope, element,attrs) {
                //console.log('element[0].value='+element[0].value);
                    $timeout(function(){
                        //console.log(element[0].value);
                        scope.model=element[0].value;
                    },1000);
                scope.$watch('model',function(n,o){
                    //console.log('n- %s, o - %s', n,o);
                })
             }
        };
    })
    .directive('setModelPswd', function($timeout,$parse) {
        return {
            restrict : 'A', // only activate on element attribute
            require : '?ngModel', // get a hold of NgModelController
            scope: {
                model: '=ngModel'
            },



            link: function($scope, $element,$attrs) {

                function setValueFromInputElement() {
                    //console.log('setValueFromInputElemen');
                }

               /* $scope.$watch($attrs["ngModel"], function () {
                    $element.val(modelGet($scope));
                });*/

                $element.bind("change", function () {
                    //console.log('sssss');
                    setValueFromInputElement();
                });

                $scope.$on("$myNgModelSet", function () {
                    setValueFromInputElement();
                });

                //console.log('element[0].value='+element[0].value);
                /*$timeout(function(){
                    console.log(element[0].value);
                    scope.model=element[0].value;
                },5000);
                *//*scope.$watch('model',function(n,o){
                    console.log('n- %s, o - %s', n,o);
                })*//*
                scope.element =element[0];
                scope.$watch('element',function(n,o){
                    console.log('n- %s, o - %s', n,o);
                });*/





            }
        };
    })

//AngularJS browser autofill workaround by using a directive
//http://stackoverflow.com/questions/14965968/angularjs-browser-autofill-workaround-by-using-a-directive/16800988#16800988
// Form model doesn't update on autocomplete #1460 https://github.com/angular/angular.js/issues/1460

    .directive('autoFillableField', function() {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function(scope, element, attrs, ngModel) {
                setInterval(function() {
                    var prev_val = '';
                    if (!angular.isUndefined(attrs.xAutoFillPrevVal)) {
                        prev_val = attrs.xAutoFillPrevVal;
                    }
                    if (element.val()!=prev_val) {
                        if (!angular.isUndefined(ngModel)) {
                            if (!(element.val()=='' && ngModel.$pristine)) {
                                attrs.xAutoFillPrevVal = element.val();
                                scope.$apply(function() {
                                    ngModel.$setViewValue(element.val());
                                });
                            }
                        }
                        else {
                            element.trigger('input');
                            element.trigger('change');
                            element.trigger('keyup');
                            attrs.xAutoFillPrevVal = element.val();
                        }
                    }
                }, 300);
            }
        };
    })

.directive('autoFillSync', function($timeout) {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            var origVal = elem.val();
            $timeout(function () {
                var newVal = elem.val();
                if(ngModel.$pristine && origVal !== newVal) {
                    ngModel.$setViewValue(newVal);
                }
            }, 500);
        }
    }
})


//http://plnkr.co/edit/v02xk1o3ORKaptzo40pj?p=preview
//ng-click not working after compile ng-bind-html

    /*.directive('dir', function($compile, $parse, $sce) {
        return {
            restrict: 'E',
            scope: {
                message: '=message'
            }
            link: function(scope, element, attr) {
                scope.$watch('message', function() {
                    if (scope.message){
                        scope.message.msg = $sce.trustAsHtml(scope.message.msg);
                        //console.log(html);
                    }
                    //var html = $sce.trustAsHtml(attr.content);
                    //element.html($parse(attr.message)(scope));

                    //$compile(element.contents())(scope);
                }, true);
            }
        }
    })*/

    .directive('dir', function($compile, $parse) {
        return {
            restrict: 'E',
            link: function(scope, element, attr) {
                scope.$watch(attr.content, function() {
                    element.html($parse(attr.content)(scope));
                    $compile(element.contents())(scope);
                }, true);
            }
        }
    })

    /*.directive('setModel', function($timeout) {
        return {
            restrict : 'A', // only activate on element attribute

            scope: {
                go: '=go',

            },

            link: function(scope, element,attrs) {
                console.log('element[0].value='+element[0].value);
                $timeout(function(){
                    scope.model=element[0].value;
                },1000);
            }
        };
    })*/

    .directive("spinner", function($compile){
        return {
            restrict: 'E',
            scope: {enable:"=",
            idSet:'@'},
            link: function(scope, element, attr) {
                //console.log(scope.idSet);
                if (!scope.idSet)
                    scope.idSet=1;
                var spinner =angular.element('<div class="spinner" id="spinner'+scope.idSet+'" ng-show="enable" ' +
                    'style="position: fixed; opacity: 0.6; bottom:0; z-index:2000;' +
                    'background: #CCC' +
                    /*'background: ' +
                     'url(../img/spinner.gif) no-repeat center center #d2e3c3' +*/
                    '"></div>');
                var img=angular.element('<img src="../img/spinner.gif" style="position: fixed; bottom:50%; left: 45%; ">');
                spinner.append(img);

                var el= $compile(spinner)(scope);
                $('body').append(spinner);

                scope.$on('$destroy', function() {
                    spinner.remove();
                    //$('#spinner').remove();
                });
                scope.$watch('enable',function(n,o){
                    if (n){
                        //console.log('dd');
                        abso()
                    }
                });

                function abso() {
                    var height= ($("body").height()>$(window).height())?$("body").height():$(window).height();

                    //$('#spinner')
                        spinner.css({
                        position: 'fixed',
                        width: $(window).width(),
                        height: height
                    });
                }
                $(window).resize(function() {
                    console.log('sssss');
                    abso();
                });
                /*$(window).scroll(function(){
                 if($(window).scrollTop() > elementPosition.top){
                 spinner.css('position','fixed').css('top','0');
                 } else {
                 $('#navigation').css('position','static');
                 }
                 });*/

                abso();

                /*scope.$watch('enable', function() {
                 //                element.html($parse(attr.content)(scope));
                 //                $compile(element.contents())(scope);
                 console.log(scope.enable);
                 }, true);*/
            }
        }
    })



    .directive('loadingWidget', function (requestNotification) {
        return {
            restrict: "AC",
            link: function (scope, element) {
                // hide the element initially
                element.hide();

                //subscribe to listen when a request starts
                requestNotification.subscribeOnRequestStarted(function () {
                    // show the spinner!
                    element.show();
                });

                requestNotification.subscribeOnRequestEnded(function () {
                    // hide the spinner if there are no more pending requests
                    if (requestNotification.getRequestCount() === 0) element.hide();
                });
            }
        };
    })


    .directive('elastiSlide', function($compile,$timeout,localStorage) {
        return {
            restrict: 'A',
            scope:{
                elastiSlide:'=',
                onPhotoSelected: '&',
                goId:'@'
                },
            link: function(scope, element, attrs) {
                /*scope.$watch('elastiSlide',function(n,o){
                    //console.log(n);
                    //if (n==o) return;
                    linkElastislide(n);
                })*/
                scope.viewedL=localStorage.get('viewed');
                scope.viewed=[];
                //console.log(scope.viewedL.length);
                for (var i = scope.viewedL.length-1,l=0;i>=l;i--){
                    //console.log(i);
                    scope.viewed[scope.viewed.length]= scope.viewedL[i];
                }
                $timeout(function(){
                    linkElastislide(scope.viewed)
                },50);

                function linkElastislide(galArr){
                    /*console.log(galArr);
                    console.log(scope.goId);*/
                    if (galArr.length>2){

                        //var div= angular.element('<div class="fixed-bar"></div>');
                        var galul =angular.element('<ul id="carouse'+scope.goId+'"  class="elastislide-list"></ul>');
                        var s;
                        for(var i=0;i<galArr.length;i++){
                            s=galArr[i];
                            //console.log(galArr[i]);
                            galul.append("<li><a  title='купить "+ s.categoryName+" оптом от производителя "+s.name+" "+s.colorName+"'" +
                                "data-ng-click='goToViewed("+i+")'><img style='max-width: 100px; border-color: transparent' src='"+galArr[i].img+"' /></a></li>");
                        }
                        var el= $compile(galul)(scope);
                        element.parent().append(el);
                        $timeout(function(){
                            $('#carouse'+scope.goId).elastislide();
                        },50);


                    }
                    scope.$on('$destroy', function() {
                        $('#carouse'+scope.goId).remove();
                    });
                    scope.goToViewed = function(index){
                        scope.onPhotoSelected({itemToGo:galArr[index]});
                    }
                }

            }
        }
    });


'use strict';
//Получаем i18n список стран, регионов, населенных пунктов из ВКонтакте
//http://habrahabr.ru/post/204840/

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

//Best way to search item in the javascript array
//http://stackoverflow.com/questions/13111074/best-way-to-search-item-in-the-javascript-array
function havePropValue(prop, value) {
    return function(obj) {
        return obj[prop] == value;
    };
}
function findObInArray(arr,prop,value){
    //console.log(prop,value);
    //console.log(arr)
    for (var i=0,l=arr.length;i<l;i++){
        //console.log(arr[i][prop])
        if (arr[i][prop]==value){
            return arr[i];
            break;
        }
    }
    //console.log('???');
    return undefined;
}


/* Controllers */

angular.module('myApp.controllers', [])



.controller('mainFrameCtrl',['$scope', '$location','Auth',"$stateParams" ,"$rootScope","$window","$http",'$sce','$filter','Category',"Filters","User",'News','$timeout','chats','socket','$interval','CartLocal','UserService','dialogs','$translate','global','globalSrv',
        function              ($scope, $location, Auth,    $stateParams,    $rootScope,  $window,  $http,  $sce,  $filter,Category,Filters,User,News,$timeout,chats,socket,$interval,CartLocal,UserService,dialogs,$translate,global,globalSrv) {


            $scope.setInitData=function(configServer,categoriesServer,filterServer,userServer,statsServer){
                /*console.log(brandServer);
                 console.log(userServer);*/
                //console.log(configServer);
                global.set('config',configServer);
                $scope.config=global.get('config');
                $rootScope.commonFilter.tags=$scope.config.val.tags;

                global.set('categories',categoriesServer);
                $scope.categories=global.get('categories');
                global.set('filters',filterServer);
                $scope.filters=global.get('filters');
                global.set('user',userServer);
                $scope.user=global.get('user');
                if ($scope.user.val){
                    doWhenUserIs($scope.user.val);
                }
                global.set('stats',statsServer);
                $scope.statPages=global.get('stats');
            };

            $scope.country=global.get('country');
            $scope.currency=global.get('currency');
            $scope.rate=global.get('rate');

            globalSrv.getData('country').then(function(response){

                global.set('country',response.data);
                if (response.data && response.data.country_code){
                    if (response.data.country_code=='RU' ||response.data.country_code=='RUS'){
                        global.set('currency',"RUB");
                        global.set('rate',$scope.config.val.currency['RUB'][0]);
                    } else if (response.data.country_code=='UA'){
                        global.set('currency',"UAH");
                        global.set('rate',$scope.config.val.currency['UAH'][0]);
                    }
                    else {
                        global.set('currency',"USD");
                        global.set('rate',$scope.config.val.currency['USB'][0]);
                    }
                    //console.log(global.get('rate'));
                }
            });

            //todo добавить установку значения через global.country
            $translate.use('ru');
            moment.lang("ru");

            //$scope.Auth=Auth;

            $scope.trustHtml = function(text,i){

                if(i){
                    text= $filter('cut')(text,true,i,"...");
                }
                //noinspection UnnecessaryLocalVariableJS
                var trustedHtml = $sce.trustAsHtml(text);
                return trustedHtml;
            };

            // при инициализации
            $scope.localCart=CartLocal;



            $scope.countNewMsgs=0;


            /**
             *
             * @returns {number}
             */
            $scope.displayNewMsg=function(){
                var newMsg=0;
                var list = chats.chatList;
                for (var i=0;i<list.length;i++){
                    if (list[i].newMsg){
                        newMsg+=list[i].newMsg;
                    }
                }
                return $scope.countNewMsgs=newMsg;
            };

            $scope.stopTime=null;
            $scope.$watch('countNewMsgs',function(){
                if ($scope.countNewMsgs && !$scope.stopTime){
                    $scope.stopTime = $interval(function(){
                        if ($rootScope.titles.pageTitle=='************'){
                            $rootScope.titles.pageTitle=$scope.title;
                        } else {
                            $scope.title=$rootScope.titles.pageTitle;
                            $rootScope.titles.pageTitle='************';
                        }

                    }, 800);

                }else if (!$scope.countNewMsgs && $scope.stopTime) {
                    $interval.cancel($scope.stopTime);
                    $scope.stopTime=null;
                    $rootScope.titles.pageTitle=$scope.title;
                }
            });



            //$scope.collections=BrandTags.list({brand:'brand',limit:2});


            $scope.displayDate= function(dateStr,time){
                var q='ll';
                if (time){
                    q='lll';
                }
                dateStr = moment(dateStr).format(q);
                return dateStr;
            };




            if ($rootScope.lang!=$rootScope.$stateParams.lang) {
                $rootScope.lang=$rootScope.$stateParams.lang;
                document.cookie = "lan="+$rootScope.lang+";path=/";
            }

            $scope.lang=$rootScope.lang;




            $scope.$on('logout', function(event, user) {
                //$scope.user=null;
                global.set('user',null);
                $rootScope.socket.emit('delete user from chat');
                chats.refreshLists(true,true);
                //$location.path('/login');
            });
            $scope.$on('logged', function(event, user) {
                //console.log(user)
                $.playSound('sounds/login');
                global.set('user',user);
                //$scope.user=user;
                doWhenUserIs(user);
            });

            function doWhenUserIs(user){
                $scope.contact.msg.name=user.name;
                $scope.contact.msg.email=user.email;
                socket.emit('new user in chat',user._id);
                chats.refreshLists(user);
            }


        $scope.logout = function() {
            Auth.logout()
        };
        $scope.isActive = function(route) {
            return route === $location.path();
        };

        $scope.lanImg="img/icon/"+$rootScope.lang+".png";
        if ($rootScope.lang=='ru')
            $scope.langName='рус';
        else
            $scope.langName='eng';



           $scope.changeCurrency= function(lan){
           /*    $scope.currency=lan;
               console.log('sss');*/
               global.set('currency',lan);
               global.set('rate',$scope.config.val.currency[lan][0]);
               //console.log($scope.currency);
               //$scope.$apply();
           };
        $scope.changeLanguage= function(lan){
            if(lan==$rootScope.lang) return;

             var arr_path = $location.path().split('/');
             if (arr_path.length>=2){
                 arr_path[1]=lan;
                 var path_name = arr_path.join("/");
                 arr_path = arr_path.join("/");
             }
            document.cookie = "lan=" +lan+";path=/";
              window.location.href=arr_path;

        };

            $scope.toCategory = function(obj){
               // console.log(obj);
                $rootScope.$state.transitionTo('language.stuff',obj,{ reload: true,
                    inherit: false,
                    notify: true  })
            };

        $scope.searchStr='';
        $scope.goToSearch=function(searchStr){
            $scope.searchStr='';
            if (!searchStr || !searchStr.trim()) return;
            $rootScope.$state.transitionTo('language.searchStuff',{'searchStr':searchStr,'lang':$rootScope.lang},{ reload: true,
                inherit: false,
                notify: true })
        };

            $scope.contact={msg:{name:'',email:'',text:''}};

            $scope.contact.sendMessage = function(){
                if ($scope.contact.msg.text.length<10){
                    $scope.contact.errorText = true;
                    $timeout(function(){$scope.contact.errorText = false}, 3000);
                }
                else{
                    $scope.contact.msg.text=$scope.contact.msg.text.substring(0,700);
                    $scope.contact.feedbackDisabled=true;
                    //$scope.contact.SuccessFeedBack = true;
                    //return;

                    $http.post('/api/feedback',$scope.contact.msg).
                        success(function(data, status) {
                            $scope.contact.feedbackDisabled=false;
                            $scope.contact.msg.text='';
                            dialogs.notify('сообщение','Ваше сообщение отправлено!');
                           /* $scope.data = data;
                            $scope.contact.feedbackDisabled=false;
                            $scope.contact.msg.text='';
                            $timeout(function(){
                                $scope.contact.SuccessFeedBack = false;
                            }, 10000);*/
                        }).
                        error(function(data, status) {
                            console.log(status);
                            console.log(data);
                            $scope.contact.feedbackDisabled=false;
                            $scope.contact.feedbackError = true;
                            $timeout(function(){$scope.contact.feedbackError=false}, 3000);
                        });
                }
            };
            $scope.subscribe={};
            $scope.subscribe.send=function(){
                if (!$scope.subscribe.email) retun;
                var email=$scope.subscribe.email.substring(0,50);
                $rootScope.$state.transitionTo('language.signup',{lang:$rootScope.$stateParams.lang,email:email});
               /* $scope.contact.feedbackDisabled=true;
                $http.get('/api/users/subscribe/'+email).
                    success(function(data, status) {
                        $scope.contact.feedbackDisabled=false;
                        dialogs.notify('Подписка','На указанный Вами адрес електронной почты отправлено письмо. Для подтверждения подписки по указанному адресу необходимо перейти по ссылке указанной в письме.');
                    }).
                    error(function(data, status) {
                        $scope.contact.feedbackDisabled=false;
                        console.log(data)
                    });*/
            }


            //************ социальные сети

            $scope.Share = {
                vkontakte: function(purl, ptitle, pimg, text) {
                    var url  = 'http://vkontakte.ru/share.php?';
                    url += 'url='          + encodeURIComponent(purl);
                    url += '&title='       + encodeURIComponent(ptitle);
                    url += '&description=' + encodeURIComponent(text);
                    url += '&image='       + encodeURIComponent(pimg);
                    url += '&noparse=true';
                    $scope.Share.popup(url);
                },
                odnoklassniki: function(purl, text) {
                    var url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
                    url += '&st.comments=' + encodeURIComponent(text);
                    url += '&st._surl='    + encodeURIComponent(purl);
                    $scope.Share.popup(url);
                },
                facebook: function(purl, ptitle, pimg, text) {
                    var url  = 'http://www.facebook.com/sharer.php?s=100';
                    url += '&p[title]='     + encodeURIComponent(ptitle);
                    url += '&p[summary]='   + encodeURIComponent(text);
                    url += '&p[url]='       + encodeURIComponent(purl);
                    url += '&p[images][0]=' + encodeURIComponent(pimg);
                    console.log(url)
                    $scope.Share.popup(url);
                },
                twitter: function(purl, ptitle) {
                    var url  = 'http://twitter.com/share?';
                    url += 'text='      + encodeURIComponent(ptitle);
                    url += '&url='      + encodeURIComponent(purl);
                    url += '&counturl=' + encodeURIComponent(purl);
                    $scope.Share.popup(url);
                },
                mailru: function(purl, ptitle, pimg, text) {
                    console.log(pimg)
                    var url  = 'http://connect.mail.ru/share?';
                    url += 'url='          + encodeURIComponent(purl);
                    url += '&title='       + encodeURIComponent(ptitle);
                    url += '&description=' + encodeURIComponent(text);
                    //url += '&imageurl='    + encodeURIComponent(pimg);
                    $scope.Share.popup(url)
                },

                popup: function(url) {
                    window.open(url,'','toolbar=0,status=0,width=626,height=436');
                }
            };

}])

    .controller('homeCtrl', ['$scope','News','$rootScope','Stuff','global',function ($scope,News,$rootScope,Stuff,global) {

        /**
         *
         * @param  {string} one
         * @param two
         * @param three
         * @param four
         */
        function tetsJB(parameters){
            var one = parameters.one;
            var two = parameters.two;
            var three = parameters.three;
            var four = parameters.four;

        }

        tetsJB({one: 10});
        //$scope.categories=$rootScope.categories;
        $scope.lang=$rootScope.$stateParams.lang;
        $scope.category=[];
        $scope.popStuff=[];
        $scope.category=global.get('categories').val;


        var images=[];
        $scope.category.forEach(function(item){
            images[images.length]={
                img:item.img,
                name:item.name[$scope.lang],
                url:item._id,
                lang:$scope.lang,
                alt:"купить оптом "+item.name[$scope.lang]+" от Украинского производителя модной одежды",
                title:"купить оптом "+item.name[$scope.lang]
            }
        });
        $scope.images=images;
        Stuff.list({category:"535f69c5377721f019fef375",brand:'section',page:0,main:'main'},function(res){
            var tepmArr=[];
            var col=0;
            res.shift();
            for (var i=0;i<res.length;i++){
                var temp=null;
                for(var j=0;j<res[i].gallery.length;j++){
                    if (!temp){
                        temp={
                            img:res[i].gallery[j].thumb,'name':res[i].name[$scope.lang],
                            'color':res[i].gallery[j].tag.name[$scope.lang],
                            'id':res[i]._id,'colorId':res[i].gallery[j].tag._id,section:$rootScope.mainSection,
                            category:res[i].category,index:res[i].gallery[j].index
                        }
                    } else {
                        if (res[i].gallery[j].index<temp.index){
                            temp={
                                img:res[i].gallery[j].thumb,'name':res[i].name[$scope.lang],
                                'color':res[i].gallery[j].tag.name[$scope.lang],
                                'id':res[i]._id,'colorId':res[i].gallery[j].tag._id,section:$rootScope.mainSection,
                                category:res[i].category,index:res[i].gallery[j].index
                            }

                        }
                    }
                }
                if (temp){
                    col++;
                    tepmArr.push(temp);
                }
                if (col>=12) break;

            }
            $scope.popStuff=tepmArr;
        });

        $scope.lastNews=[];
        News.list({page:1,main:'main'},function(tempArr){
            for (var i= 0,l=tempArr.length; i<l; i++) {
                tempArr[i].desc=(tempArr[i].desc0[$scope.lang]=='')?tempArr[i].desc1:tempArr[i].desc0;
                tempArr[i].desc[$scope.lang]= tempArr[i].desc[$scope.lang].substring(0,150);
                $scope.lastNews.push(tempArr[i]);
            }
        });


    }])

    .controller('stuffCtrl', ['$scope','Brands','$rootScope','Category','Filters','Stuff','$q','$timeout','BrandTags','$location','$anchorScroll','mongoPaginator','global',
        function ($scope,Brands,$rootScope,Category,Filters,Stuff,$q,$timeout,BrandTags,$location,$anchorScroll,mongoPaginator,global) {

            if ($rootScope.$stateParams.scrollTo){

                $timeout(function(){
                    $scope.scrollTo($rootScope.$stateParams.scrollTo);
                },1000)

            }
            $scope.paginate={page:0,row:0,totalItems:0};
            $scope.$watch('paginate.page',function(n,o){
                if ($scope.paginate.row==0){
                    return;
                } else {
                    if ($scope.query.page!=n){
                        $scope.query.page=n;
                    }
                }
            });
            $scope.goToViewed=function(item){
                var stuff=  item;
                $rootScope.$state.transitionTo('language.stuff.detail',
                    {'lang':$rootScope.$stateParams.lang,'category':stuff.category,
                        'id':stuff.id,'color':stuff.color});
            };
            var getCategoryName = function(id){
                return findObInArray($scope.categories,'_id',id).name[$scope.lang];
            };

            $scope.stuffList=[];

            //$scope.filterTags='';
            $scope.textList='';
            $scope.headerList='';
            $scope.filterTagsArray=[];
            // для фильтрации списка по цвету
            $scope.filterForColor='';


            // инициализация********************************
            //язык
            $scope.lang=$rootScope.$stateParams.lang;
            //активная категория
            $scope.selectedCategory=$rootScope.$stateParams.category;
            $scope.categories=global.get('categories').val;
            $scope.config=global.get('config').val;
            //секция
            $scope.section="535f69c5377721f019fef375";
            // запрос на выбор моделей. наблюдая за ним вызываем функцию формирования списка
            $scope.query = {category:$scope.selectedCategory,filters:'',page:0};
            $scope.filterDisplay=[];
            $scope.checkfilterList=[];

            $scope.$watch('query',function(n,o){
                $scope.getStuffList(n.category, n.filters);
            },true);

            //*********************************************
            $scope.$watch('selectedCategory',function(newValue, oldValue){
                if (newValue != oldValue){
                    $scope.query.category=newValue;
                    $scope.query.page=$scope.paginate.page=0;
                    $scope.query.filters='';
                    $scope.filterForColor='';
                };
                $scope.filters=[];
                if (newValue){
                    // получение актуально списка фильтров
                    $scope.findCategory=findObInArray($scope.categories,'_id',$scope.selectedCategory);
                    $scope.textList=$scope.findCategory.desc[$scope.lang];
                    $scope.headerList=$scope.findCategory.name[$scope.lang];
                    if ($scope.findCategory.filters && $scope.findCategory.filters.length){
                        $scope.filters=global.get('filters').val.filter(function(item){
                            if ($scope.findCategory.filters.indexOf(item._id)>-1)
                            return true;
                        });
                        if($scope.filters && $scope.filters.length){
                            for (var i= 0,l=$scope.filters.length;i<l;i++){
                                $scope.filters[i].value='';
                            }
                        }
                    }
                    //console.log($scope.filters)
                    if ($rootScope.$stateParams.lang=="ru"){
                        $rootScope.titles.pageTitle= 'Платья. туники. кардиганы оптом от производителя. Скидки.Модная женская одежда на Jadone fashion.'+$scope.headerList;
                        $rootScope.titles.pageKeyWords='купить '+$scope.headerList+' оптом, в розницу,купить '+$scope.headerList+' от производителя,стильная одежда, женская одежда оптом, красивая стильная одежда';
                        //(вставить наименование бренда, к которой относится данная модель),
                        $rootScope.titles.pageDescription="В нашем интернет-магазине Вы можете купить оптом  и в розницу платья, туники, костюмы  от известного " +
                            " производителя модной женской одежды "+$scope.headerList;
                    }
                } else {
                    $scope.textList='';
                    $scope.headerList='';
                    $scope.filters=global.get('filters').val;
                    if($scope.filters && $scope.filters.length){
                        for (var i= 0,l=$scope.filters.length;i<l;i++){
                            $scope.filters[i].value='';
                        }
                    }
                }

            });
            // возвращает труе и если у фильтра фотя бы одно значение используется у моделей (в массиве используемых фильтров)
            $scope.displayFilterTags=function(tags){
                //console.log(tags);
                for (var i = 0,l=tags.length;i<l;i++){
                    if ($scope.filterTagsArray.indexOf(tags[i]._id)>-1){
                        return true;
                        break;
                    }
                }
                return false;
            };
            $scope.$watch('filters', function (newVal,oldVal) {
                if  (newVal && newVal.length && newVal!=oldVal){
                    var s;
                    for (var i= 0,l=newVal.length;i<l;i++){
                        if (newVal[i]._id=="5364db7b707981801b256497"){
                            $scope.filterForColor= newVal[i].value;
                        }
                        if (newVal[i].value){
                            if (s) s+=','; else s='';
                            s +=newVal[i].value;
                        }
                    }
                    $scope.filterTags=s;
                    $scope.query.filters=s;
                }
            }, true);

            $scope.getStuffList = function(categoryId,s){
                /*console.log(categoryId);*/
                //console.log(s);
                var filterTags=(s)?s:'';
                $scope.stuffList=[];

                var  brandId;
                if (categoryId){
                    brandId=0;
                } else {
                    categoryId=$scope.section;
                    brandId='section';
                }
                //console.log(categoryId)
                //console.log($scope.page  );
                //console.log($rootScope.$stateParams);
                //var searchStr=($rootScope.$stateParams.searchStr)?$rootScope.$stateParams.searchStr:'';
                function noStock(tag,stock){
                   // console.log(stock);
                    if(stock && stock[tag]) {
                        var is = true;
                        for (var key in stock[tag]){
                            if (!stock[tag][key]){
                                is = false;
                            }
                        }
                        return is;
                    } else{
                        return false;
                    }
                }
                //console.log(filterTags);
                Stuff.list({category:categoryId,brand:brandId,page:$scope.query.page,filterTags:filterTags},function(tempArr){
                    if ($scope.paginate.page==0 && tempArr.length>0){
                        $scope.paginate.totalItems=tempArr.shift().index;
                    }

                    //$scope.checkfilterList=[];

                    $scope.filterTagsArray=[];

                    for (var i= 0,ll=tempArr.length; i<ll; i++) {
                        // получение списка используемых фильтров
                        for (var ij= 0,lj=tempArr[i].tags.length;ij<lj;ij++){
                            if ($scope.filterTagsArray.indexOf(tempArr[i].tags[ij]<0)){
                                $scope.filterTagsArray[$scope.filterTagsArray.length]=tempArr[i].tags[ij];
                            }
                        }

                        var stock;
                        if (tempArr[i].stock){
                            stock=JSON.parse(tempArr[i].stock);
                        }

                        var filtersForStatus=JSON.parse(JSON.stringify(tempArr[i].tags));
                        var tempGallery=[];
                        tempArr[i].gallery=_(tempArr[i].gallery).sortBy(function(obj) { return +obj.index });
                        for (var j= 0,len=tempArr[i].gallery.length;j<len;j++){
                            if (tempGallery.length<1 && tempArr[i].gallery[j].tag && tempArr[i].gallery[j].tag._id){
                                tempGallery[tempGallery.length]=tempArr[i].gallery[j];
                                var l = tempArr[i].tags.indexOf(tempArr[i].gallery[j].tag._id);
                                if (l>-1){
                                    tempArr[i].tags.splice(l,1);
                                }
                            } else{
                                var is=false;
                                for (var k=0;k<tempGallery.length;k++){
                                    if (tempArr[i].gallery[j].tag && tempGallery[k].tag._id==tempArr[i].gallery[j].tag._id){
                                        is=true;
                                        if(tempArr[i].gallery[j].index<tempGallery[k].index){
                                            tempGallery.splice(k,1);
                                            tempGallery[tempGallery.length]=tempArr[i].gallery[j];
                                           // is=true;
                                        }
                                    }
                                }
                                if (!is && tempArr[i].gallery[j].tag) {
                                    tempGallery[tempGallery.length]=tempArr[i].gallery[j];
                                    var l = tempArr[i].tags.indexOf(tempArr[i].gallery[j].tag._id);
                                    //console.log(l);
                                    if (l>-1){
                                        tempArr[i].tags.splice(l,1);
                                    }
                                }
                            }
                       }
                        var price = (tempArr[i].priceSale)? tempArr[i].priceSale:tempArr[i].price;
                        var retail = (tempArr[i].retailSale)? tempArr[i].retailSale:tempArr[i].retail;

                        for (var j=0;j<tempArr[i].tags.length;j++){
                            if ($scope.checkfilterList.indexOf(tempArr[i].tags[j])<0){
                                $scope.checkfilterList[$scope.checkfilterList.length]=tempArr[i].tags[j];
                            }
                        }
                        for (var j= 0,len=tempGallery.length;j<len;j++){
                            var status=0;
                            // 1 - распродажа
                            // 2- новинка
                            // 3- нет в наличии
                            if (filtersForStatus.indexOf(tempGallery[j].tag._id)<0 || filtersForStatus.indexOf($scope.commonFilter.tags[2])>-1
                                || noStock(tempGallery[j].tag._id,stock)){
                                //tempGallery[j].tag._id tag of color

                                status=3;

                            } else if(filtersForStatus.indexOf($scope.commonFilter.tags[1])>-1){
                                status=2;
                            } else if( filtersForStatus.indexOf($scope.commonFilter.tags[0])>-1){
                                status=1;
                            }
                            var tags=JSON.parse(JSON.stringify(tempArr[i].tags));
                            tags.push(tempGallery[j].tag._id);
                            if ($scope.checkfilterList.indexOf(tempGallery[j].tag._id)<0){
                                $scope.checkfilterList.push(tempGallery[j].tag._id);
                            }
                            //console.log(tempGallery[j]);
                            $scope.stuffList.push({img:tempGallery[j].thumb,'name':tempArr[i].name[$scope.lang],
                                'color':tempGallery[j].tag.name[$scope.lang],'price':price,'retail':retail,'tags':tags,'category':getCategoryName(tempArr[i].category),
                            'id':tempArr[i]._id,'colorId':tempGallery[j].tag._id,'status':status});
                        }
                    }


                    //console.log($scope.filterTagsArray)
                });

            };

            $scope.goToStuffDetail = function(item){
                $rootScope.$state.transitionTo('language.stuff.detail',{id:item.id,color:item.colorId});
            };

            //прокрутка вверх екрана
            $scope.scrollTo = function(id) {
                //console.log(id);
                $location.hash(id);
                $anchorScroll();
            };
            $scope.scrollTo();
        }])

    .controller('stuffDetailCtrl',['$scope','Stuff','$rootScope','$timeout','CartLocal','Comment','localStorage','$location','$anchorScroll',
        function($scope,Stuff,$rootScope,$timeout,CartLocal,Comment,localStorage,$location,$anchorScroll){

            $location.hash();
            $anchorScroll();
            $scope.viewed=localStorage.get('viewed');
            //console.log($scope.viewed); return;

            $scope.goToViewed=function(item){
                var stuff=  item;
                $rootScope.$state.transitionTo('language.stuff.detail',
                    {'lang':$rootScope.$stateParams.lang,'category':stuff.category,
                        'id':stuff.id,'color':stuff.color});
            };


        $scope.lang=$rootScope.$stateParams.lang;
        $scope.cart=CartLocal.list();
        $scope.itemToCart={'stuff':'','status':1,'color':'','size':'','name':'','colorName':'','sizeName':'','quantity':1,'price':1,'retail':1,
            'category':$rootScope.$stateParams.category,'categoryName':'','img':''};
        /*$scope.itemToCart={'stuff':'','status':1,'color':'','size':'','name':'','colorName':'','sizeName':'','quantity':1,'price':1,'retail':1,
            'category':$rootScope.$stateParams.category,'categoryName':'','section':$rootScope.$stateParams.section,'img':''};*/
        if($rootScope.$stateParams.size){
            $scope.itemToCart.size=$rootScope.$stateParams.size
        }

        function htmlToPlaintext(text) {
            return String(text).replace(/<[^>]+>/gm, '');
        }




        $scope.ez;
        $scope.currentQuantity=1;
        $scope.quantityArr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
            25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];


        var setViewed = function(){
            var viewedItem ={lang:$rootScope.$stateParams.lang,
                category:$rootScope.$stateParams.category,color:$rootScope.$stateParams.color,
                id:$rootScope.$stateParams.id,img:$scope.activePhoto.thumb,
                categoryName:$scope.itemToCart.categoryName,name:$scope.itemToCart.name,
                colorName:$scope.itemToCart.colorName};
            var posItem = -1;
            for (var i= 0,l=$scope.viewed.length;i<l;i++){
                var item=$scope.viewed[i];
                if (item.id==viewedItem.id && item.category==viewedItem.category && item.color==viewedItem.color) {
                    posItem=i;
                    break;
                }
            }

            //console.log(posItem);
            if (posItem>-1){
                $scope.viewed.splice(posItem,1);
            }
            if ($scope.viewed.length>20){
                $scope.viewed.splice(0,1);
            }
            $scope.viewed[$scope.viewed.length]=viewedItem;
            //$scope.viewed=[];
            //console.log($scope.viewed);
            localStorage.set('viewed', $scope.viewed);
        };

        $scope.stuff=Stuff.full({id:$rootScope.$stateParams.id,page:'page'},function(res,err){
            $scope.itemToCart.stuff=res._id;
            $scope.itemToCart.artikul=res.artikul;
            $scope.itemToCart.name=res.name[$scope.lang];
            $scope.itemToCart.categoryName=res.category.name[$scope.lang];
            $scope.itemToCart.price=(res.priceSale)?res.priceSale:res.price;
            $scope.itemToCart.retail=(res.retailSale)?res.retailSale:res.retail;
            for (var i=0;i<res.gallery.length;i++){
                if ($rootScope.$stateParams.color==res.gallery[i].tag){
                    if (!$scope.activePhoto){
                        $scope.activePhoto=res.gallery[i];
                    } else if ($scope.activePhoto.index>res.gallery[i].index){
                        $scope.activePhoto=res.gallery[i];
                    }
                }
            }
            if (res.stock){
                res.stock=JSON.parse(res.stock);
                //console.log(res.stock);
            }
            //console.log($rootScope.$stateParams);


            getCurrentSize(res.category.filters,res.tags);
            //console.log();
            if ($scope.lang=='ru'){
                $rootScope.titles.pageTitle= $scope.itemToCart.categoryName+' '+ $scope.itemToCart.name+
                    ' оптом от производителя на Jadone fashion. Платья, туники, кардиганы. Скидки.';
                $rootScope.titles.pageKeyWords='купить '+$scope.itemToCart.categoryName+' оптом,в розницу,купить  '+$scope.itemToCart.categoryName+
                    ' от производителя,стильная одежда, женская одежда оптом, красивая стильная одежда '+$scope.itemToCart.colorName ;
                //(вставить наименование бренда, к которой относится данная модель),
                $rootScope.titles.pageDescription= $scope.itemToCart.name+" - "+$scope.itemToCart.colorName+" всех размеров "+
                    htmlToPlaintext($scope.stuff.desc[$scope.lang]).substring(0,100);
            }


            function showOptionColor(id){
                //console.log('jj - '+jj++);
                if (!res.gallery || !res.gallery.length) return;
                for (var i= 0,l=res.gallery.length;i<l;i++){
                    if (res.gallery[i].tag==id) {
                        return true;
                    }
                }
                return false;
            }
            $scope.colorsArray=[];
            for(var i= 0,l=res.category.mainFilter.tags.length;i<l;i++){
                if(showOptionColor(res.category.mainFilter.tags[i]._id)){
                    $scope.colorsArray[$scope.colorsArray.length]=res.category.mainFilter.tags[i];
                }
            }
            //console.log($scope.colorsArray);


        });

//*****************************************photo**************************************************
            //$scope.activePhoto={thumb:''}
        $scope.$watch('activePhoto',function(){
            if (!$scope.activePhoto) return;
            $scope.itemToCart.color=$scope.activePhoto.tag;
            if (!$scope.activePhoto.name) {
                var tags=$scope.stuff.category.mainFilter.tags;
                for (var i=0;i<tags.length;i++){
                    if (tags[i]._id==$scope.activePhoto.tag){
                        $scope.activePhoto.name=tags[i].name[$scope.lang];
                    }
                }
            }
            if ($scope.color){
                $scope.color=$scope.activePhoto.tag
            } else {
                $timeout(function(){$scope.color=$scope.activePhoto.tag;},300)
            }
            $scope.itemToCart.img=$scope.activePhoto.thumb;
            $scope.itemToCart.color=$scope.activePhoto.tag;
            $scope.itemToCart.colorName=$scope.activePhoto.name;
            if ($scope.itemToCart.size) {
                $scope.currentQuantity=CartLocal.getCount($scope.itemToCart);
            }
            //******** социальные сети
            $scope.shareUrl='http://jadone.biz/ru/stuff/category/'+$scope.itemToCart.category+"/stuffdetail/"+
            $scope.itemToCart.stuff+"/"+$scope.itemToCart.color;
            $scope.shareTitle=$scope.itemToCart.categoryName+' '+$scope.itemToCart.name;
            $scope.shareImg = 'http://jadone.biz'+$scope.activePhoto.thumb;
            $scope.shareDesc=$scope.itemToCart.categoryName+' '+$scope.itemToCart.name+' от производителя модной современной одежды.'

            $rootScope.titles.image=$scope.shareImg;
            //***********************************************************


            setViewed();

        });

        $scope.changeColor = function(tag){
            var j=0;
            for (var i=0;i<$scope.stuff.gallery.length;i++){
                if (tag==$scope.stuff.gallery[i].tag){
                    if ($scope.activePhoto.tag!=$scope.stuff.gallery[i].tag){
                        j=i;
                        //$scope.activePhoto=$scope.stuff.gallery[i];
                    } else if ($scope.activePhoto.index>$scope.stuff.gallery[i].index){
                        j=i;
                        //$scope.activePhoto=$scope.stuff.gallery[i];
                    }
                }
            }
            $scope.changePhoto(j);
        };

        $scope.changePhoto= function(index){
            if (!$scope.ez){
                $scope.ez =$('#img_001').data('elevateZoom');
            }
            $scope.ez.swaptheimage($scope.stuff.gallery[index].thumb, $scope.stuff.gallery[index].img);
            $scope.activePhoto=$scope.stuff.gallery[index];
            /*$scope.itemToCart.color=$scope.activePhoto.tag;
            $scope.currentQuantity=CartLocal.getCount($scope.itemToCart);*/
        };
        //var jj=0;


//*********************************************size***********************************************
        function getSizeName(tags){
            for (var i=0;i<tags.length;i++){
                if (tags[i]._id==$scope.itemToCart.size) {
                    $scope.itemToCart.sizeName=tags[i].name[$scope.lang];
                }
            }
        };
        $scope.filterSize=[];
        function getCurrentSize(filters,tags){
            var tempArr=[];
            for (var i=0;i<filters.length;i++){
                //if (is) break;
                if (filters[i].name['en'].toLowerCase()=='size'){
                    for (var j=0;j<filters[i].tags.length;j++){
                        //console.log(filters[i].tags[j]);
                        for (var l=0;l<tags.length;l++){
                            if (filters[i].tags[j]==tags[l]._id) {
                                tempArr.push(tags[l]);
                                if (!$scope.itemToCart.size){
                                    $scope.itemToCart.size=tags[l]._id;
                                    $scope.itemToCart.sizeName=tags[l].name[$scope.lang];
                                } else {
                                    if($scope.itemToCart.size==tags[l]._id) {
                                        $scope.itemToCart.sizeName=tags[l].name[$scope.lang];
                                    }
                                }
                          }
                        }
                    }
                }
            }
            $scope.filterSize=tempArr;
        }
        $scope.changeSize = function(){
            getSizeName($scope.stuff.tags);
            $scope.currentQuantity=CartLocal.getCount($scope.itemToCart);
        };
//***************************************** end size ******************************************
        $scope.disabledToCart=function(){
            //console.log(new Date().getTime());

            if ($scope.stuff.stock){
                /*console.log($scope.stuff.stock[$scope.itemToCart.color][$scope.itemToCart.size]);
                console.log($scope.stuff.stock[$scope.itemToCart.color]);
                console.log($scope.stuff.stock[$scope.itemToCart.color][$scope.itemToCart.size]);*/
                if ($scope.stuff.stock[$scope.itemToCart.color] && $scope.stuff.stock[$scope.itemToCart.color][$scope.itemToCart.size]
                    && $scope.stuff.stock[$scope.itemToCart.color][$scope.itemToCart.size]==1){
                    return true;
                }


            }
            var disabled = false;
            var noColor=true;
            if (!$scope.stuff || !$scope.stuff.tags) return;
            for (var i=0;i<$scope.stuff.tags.length;i++){
               /* console.log($scope.activePhoto._id);
                console.log($scope.stuff.tags[i]._id);*/
                if ($scope.stuff.tags[i]._id==$scope.activePhoto.tag){
                   noColor=false;
                }
               if  ($scope.stuff.tags[i]._id==$scope.commonFilter.tags[2]){
                   disabled=true;
                   break;
               }
            }

            return disabled || noColor;
        };
        $scope.addedToCart=false;
        $scope.addToCart= function(){
            //console.log($scope.itemToCart);
            $scope.addedToCart=true;
            $scope.itemToCart.quantity=parseInt($scope.currentQuantity);
            CartLocal.addToCart($scope.itemToCart);
            $timeout(function(){
                $scope.addedToCart=false;
            },2000);

        };

        $scope.goToList=function(){
            $rootScope.$state.transitionTo('language.stuff',
                {'lang':$rootScope.$stateParams.lang,'section':'category','category':$scope.stuff.category._id,scrollTo:$scope.stuff._id+'stuff'});
        };

        //***********************************************************
        $scope.page=0;
            $scope.getComment = function(perPage){
                console.log(perPage);
                if (!perPage) {
                    perPage=5;
                } else {
                    $scope.page=0
                }
                $scope.totalItems=0;
                Comment.list({stuff:$rootScope.$stateParams.id,page:$scope.page,perPage:perPage},function(res){
                    if ($scope.page==0 && res.length>0){
                        $scope.totalItems=res.shift().index;
                    }
                    $scope.comments=res;
                });
            };
            $scope.getComment();

        $scope.comment={};
        $scope.comment.text='';
        $scope.comment.author=($rootScope.user && $rootScope.user._id)?$rootScope.user._id:'';
        $scope.comment.authorName=($rootScope.user && $rootScope.user.name)?$rootScope.user.name:'';
        $scope.comment.stuff=$rootScope.$stateParams.id;
        //console.log($scope.comment);
        $scope.moreComments=function(){
            $scope.page++;
            Comment.list({stuff:$rootScope.$stateParams.id,page:$scope.page,perPage:5},function(res){
                //console.log(res);
                for (var i=0;i<res.length;i++){
                    $scope.comments.push(res[i]);
                }
            });
        };



        $scope.showEdit=false;
        $scope.updateComment =  function(){
            $scope.disallowEdit = true;
            $scope.comment.author=$rootScope.user._id;
            Comment.add($scope.comment,function(){
                $scope.disallowEdit = false;
                $scope.showEdit=false;
                //$scope.getComment(($scope.page+1)*5);
                $scope.page=0;
                $scope.getComment();
                //$scope.afterSave();
            })



        };

        $scope.afterSave = function(){
            $scope.comment.text='';
            /*$scope.comment.author='';
            $scope.comment.date='';
*/
            var arrIndex=[];
            var comments=[];
            for(var i=1;i<=$scope.page;i++){
                arrIndex.push(i);
            }
            async.eachSeries(arrIndex,function( i, cb) {
                Comment.list({stuff:$rootScope.$stateParams.id,page: i},function(result){
                    for(var i=0;i<result.length;i++){
                        comments.push(result[i]);
                    }
                    cb();
                })
            },function(err,result){
                $scope.comments=comments;
            });
        };
        $scope.dateConvert = function(date){
            return moment(date).format('ll');
        };

   }])

    .controller('cartCtrl',['$scope','$rootScope','$timeout','CartLocal','$modal','localStorage','$http','$resource','Auth','User','global','$location','$anchorScroll',
        function($scope,$rootScope,$timeout,CartLocal,$modal,localStorage,$http,$resource,Auth,User,global,$location,$anchorScroll){
            $scope.lang=$rootScope.$stateParams.lang;
            $location.hash();
            $anchorScroll();

            $scope.goToViewed=function(item){
                var stuff=  item;
                $rootScope.$state.transitionTo('language.stuff.detail',
                    {'lang':$rootScope.$stateParams.lang,'category':stuff.category,
                        'id':stuff.id,'color':stuff.color});
            };


            //$scope.rate=global.get('rate');
            //console.log($scope.kurs)
        $scope.sendCart=false;
        $scope.comment='';
        //$scope.sendDisabled=$scope.$parent.contact.feedbackDisabled=false;
        $scope.sendDisabled=false;
            //$scope.kurs=global.get();


            /*$timeout(function(){
            if($rootScope.config && $rootScope.config.currency){
                $scope.kurs = $rootScope.config.currency[$rootScope.currency][0];
            }
        },300);

        $rootScope.$watch('currency',function(o,n){
            if($rootScope.config && $rootScope.config.currency){
                $scope.kurs = $rootScope.config.currency[$rootScope.currency][0];
            }
        })*/
        //console.log($scope.kurs);
        $scope.quantityArr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
            25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
        $scope.cart=CartLocal;
        //$scope.cart.sum=0;

        $scope.goToStuff=function(i){
           var stuff=  $scope.cart.getItem(i);
            $rootScope.$state.transitionTo('language.stuff.detail',
                {'lang':$rootScope.$stateParams.lang,'section':stuff.section,'category':stuff.category,
                'id':stuff.stuff,'color':stuff.color,'size':stuff.size});
        };



        //$scope.items;
        $scope.openModal = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                size: size,
                /*resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }*/
            });

            modalInstance.result.then(
                function (result) {
                //$scope.selected = selectedItem;
                //console.log( $scope.selected);
                    console.log(result);
                },
                function (result) {
                console.log('Modal dismissed at: ' + new Date());

            });
        };
        var ModalInstanceCtrl = function ($scope, $modalInstance) {
            $scope.modal=$modalInstance;
           $scope.home = function () {
               //console.log('aaa');
                $modalInstance.close('dddddd');
                $rootScope.$state.transitionTo('language.home',{lang:$scope.lang});
            };

            $scope.customOrder = function () {
                $modalInstance.dismiss('cancel');
                $rootScope.$state.transitionTo('language.customOrder',{lang:$scope.lang});

            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');


            };
        };


            //*************************************
            $scope.country={};
            $scope.user={};
            $scope.userGlobal = global.get('user');
            $scope.$watch('userGlobal.val',function(n){
                if (!n){
                    $scope.user={};
                    logout();
                } else{
                   $scope.user=n;
                    login();
                }

                //console.log($scope.user);
            });
            $scope.user.profile={};


            function login(user){
                $timeout(function() {
                    /*$scope.user.profile=JSON.parse(JSON.stringify(user.profile));
                     $scope.user._id=user._id;
                     $scope.user.email=user.email;
                     $scope.user.name=user.name;*/
                    $scope.step1=false;
                    $scope.step2=true;
                    //console.log('$scope.step1 - %s , $scope.step2 - %2',$scope.step1,$scope.step2);
                }, 10)
            }
            function logout(){
                $timeout(function() {
                    $scope.step1=true;
                    $scope.step2=false;
                    //console.log('$scope.step1 - %s , $scope.step2 - %2',$scope.step1,$scope.step2);
                }, 10)
            }
            /*if (Auth.isLoggedIn()){
                login();
            } else {
                logout();
            }*/

            /*$scope.$on('logged', function(event, user) {login(user);})
            $scope.$on('logout', function(event, user) {logout();})*/



            $scope.errors = {};
            /*$scope.countries=[];
            $scope.regions=[];
            $scope.cities=[];*/
            $scope.ship={name:'',country:'',shippers:[],id:''};
            /*$scope.country.detail={};
            $scope.country.options={

            }*/
            /*options = {
            *           types: type,        string, values can be 'geocode', 'establishment', '(regions)', or '(cities)'
            *           bounds: bounds,     google maps LatLngBounds Object
            *           country: country    string, ISO 3166-1 Alpha-2 compatible country code. examples; 'ca', 'us', 'gb'
                *         }*/

           /* $scope.region={};
            $scope.region.options={type:'regions'}*/
            $scope.city={};
            $scope.city.options={type:'cities'};
            $scope.options = {};

            function setShips(n){
                $scope.choiceShipper=true;
                $scope.shippers=[];
                $scope.shipper='';
                $scope.shipperOffice='';
                for (var i = 0,l=$scope.ships.length;i<l;i++){
                    if ($scope.ships[i].countryId==n){
                        $scope.shippers=$scope.ships[i].shippers;
                        break;
                    }
                }
                if ($scope.shippers.length<1){
                    for (var i = 0,l=$scope.ships.length;i<l;i++){
                        if ($scope.ships[i].countryId=='1001'){
                            $scope.shippers=$scope.ships[i].shippers;
                            break;
                        }
                    }
                }
            }

            $scope.$watch('user.profile.countryId',function(n,o){
                /*console.log(n);
                console.log(o);*/
                if (n) {
                    setShips(n);
                } else {
                    $scope.choiceShipper=false;
                    $scope.shippers=[];
                    $scope.shipper='';
                    $scope.shipperOffice='';
                }
            });

            $scope.choiceShipper=false;


            var Ship= $resource('api/ship/:id',{id:'@_id'});
            $scope.ships=Ship.query(function(res){
                if ($scope.user && $scope.user.profile && $scope.user.profile.countryId){
                    setShips($scope.user.profile.countryId);
                }
            });
          //*************************************


         //  checkout
            $scope.displayShip=false;
            $scope.sendOrder=function(){
                $scope.displayShip=true;
                $scope.sendDisabled=true;
            };

            //************************step 1 *********************************
            $scope.login = function(formLogin) {
                //console.log('sdsd');
                $scope.submittedLogin = true;
                //console.log(formLogin);
                if(formLogin.$valid) {
                    //console.log($scope.user)
                    Auth.login({
                        name:$scope.user.nameLogin,
                        email: $scope.user.emailLogin,
                        password: $scope.user.passwordLogin
                    })
                        .then( function(data) {

                            $scope.step1=false;
                            $scope.step2=true;
                        })
                        .catch( function(err) {
                            err = err.data;
                            $scope.errors = {};
                            //console.log(err);
                            if (err.errors){
                                // Update validity of form fields that match the mongoose errors
                                angular.forEach(err.errors, function(error, field) {
                                    /*console.log(error);
                                     console.log(field)*/
                                    formLogin[field].$setValidity('mongoose', false);
                                    //console.log(formLogin[field]);
                                    $scope.errors[field] = error.message;
                                });
                            } else {
                                //console.log(err)
                                var errorMsg=(err.message)?err.message:'Ошибка!';
                                if (errorMsg =="Missing credentials" ){
                                    errorMsg="Введите email!";
                                }
                                alert(errorMsg)
                            }


                        });
                } else {
                    $scope.errors.other = 'Заполните корректно поля!!!';
                }
            };
            //****************************************************************
            //*********************step1 registrayion*************************
            $scope.signUp = function(form) {

                //console.log('asasd');
                $scope.submitted = true;
                //yaCounter23946445.reachGoal('REGISTRATION');
                if(form.$valid) {
                    //console.log('valid');
                    Auth.createUser({
                        name: $scope.user.name,
                        email: $scope.user.email,
                        password: $scope.user.password,
                        profile: $scope.user.profile={fio:'',
                            phone:'',
                            zip:'',
                            country:'',
                            region:'',
                            city:'',
                            countryId:'',
                            regionId:'',
                            cityId:'',
                            address:''
                        }
                    })
                        .then( function() {
                            /*$scope.user._id=Auth.isLoggedIn()._id;
                            $scope.step1=false;
                            $scope.step2=true;*/
                        })
                        .catch( function(err) {
                            err = err.data;
                            $scope.errors = {};
                            //console.log(err);
                            // Update validity of form fields that match the mongoose errors
                            if (err.errors){
                                angular.forEach(err.errors, function(error, field) {
                                    form[field].$setValidity('mongoose', false);
                                    $scope.errors[field] = error.message;
                                });
                            } else {
                               alert(err.error);
                            }

                        });
                }
            };
            //****************************************************************
            $scope.backToCart = function(){
                //console.log('ddddd');
                $scope.displayShip=false;
                $scope.sendDisabled=false;
            };
            $scope.step2=true;
            $scope.step1=false;
            /*$scope.$watch(Auth.isLoggedIn, function (user, oldValue) {
                if(user._id) {
                    $timeout(function() {
                        $scope.user.profile=JSON.parse(JSON.stringify(user.profile));
                        $scope.user._id=user._id;
                        $scope.user.email=user.email;
                        $scope.step1=false;
                        $scope.step2=true;
                        //console.log('$scope.step1 - %s , $scope.step2 - %2',$scope.step1,$scope.step2);
                    }, 10)

                } else {
                    $timeout(function() {
                        $scope.step1=true;
                        $scope.step2=false;
                        //console.log('$scope.step1 - %s , $scope.step2 - %2',$scope.step1,$scope.step2);
                    }, 10)
                }
            }, true);*/


           /* $timeout(function(){
                $scope.foods = ['apple', 'muffin', 'chips'];
            }, 1000);*/
            function sendOrder(){
                //console.log('ssss');

                $scope.sendCart=true;

                var yaParams = {
                    order_id: "12345",
                    order_price: 123.45,
                    currency: "RUR",
                    exchange_rate: 1,
                    goods:
                        [
                            {
                                id: "1",
                                name: "название товара",
                                price: 100,
                                quantity: 1
                            }
                        ]
                };
                //console.log(window.yaCounter23946445);


                $scope.sendDisabled=true;
                $scope.comment.substring(0,200);
                //modal window
                /*$timeout(function(){
                    $scope.sendCart=false;
                    $scope.openModal();
                },2000);*/
               //console.log($scope.cart.getItems());
                //return;
                $scope.cart.send(
                    {
                        lang    :$rootScope.$stateParams.lang,
                        comment :$scope.comment,
                        kurs    :global.get('rate').val,
                        currency:global.get('currency').val,
                        profile :$scope.user.profile,
                        shipper :$scope.shipper,
                        shipperOffice:$scope.shipperOffice,
                        user:$scope.user._id
                    },
                    function(err,res){

                        $scope.sendCart=false;
                        $scope.sendDisabled=false;
                        //$scope.cart.clearCart();
                        $scope.displayShip=false;
                        if (err){
                            console.log(err);
                            alert(err.error);
                        } else {
                            var yaParams = {
                                order_id: res.num,
                                order_price: $scope.cart.getTotalSum(),
                                currency:  $rootScope.currency,
                                exchange_rate: $scope.rate.val,
                                goods:[]
                            };
                            $scope.cart.getItems().forEach(function(el){
                                yaParams.goods.push({
                                    id: "1",
                                    name: el.categoryName+' '+ el.name+' '+ el.colorName+' '+el.sizeName,
                                    price: el.price,
                                    quantity: el.quantity
                                });
                            });
                            //console.log(yaParams)

                            if (window.yaCounter23946445 && window.yaCounter23946445.reachGoal){
                                window.yaCounter23946445.reachGoal('ORDER',yaParams);
                            }
                            $scope.cart.clearCart();
                            $scope.openModal();
                        }

                });
            }

            $scope.checkOut=function(formProfile){
                //проверка на пустую корзину
                if($scope.cart.cartCount()<1){
                    return;
                }

                // проверка всех полей и способа доставки
                $scope.submittedProfile = true;
                //console.log(formLogin);
                if(formProfile.$valid) {
                    // если все нормально
                    $scope.errors={};
                    //console.log($scope.user.profile.cityId);
                    /*if ($scope.user.profile.cityId=='no id'){
                        $scope.errors.city=true;
                        $timeout(function(){$scope.errors.city=false;},3000)
                   } else {*/
                        // re write users profile
                        User.update($scope.user,function(res){
                            //console.log(res);
                            Auth.setUserProfile($scope.user.profile);
                            if (res='OK'){
                                // теперь отправляем ордер
                                sendOrder();
                            }
                        },function(err){
                            alert(err.error);
                        });
                   // }
                }/* else {
                   alert('заполните корректно поля');
                }*/
            }


    }])

    .controller('loginCtrl',['$scope', '$location','Auth','$rootScope','User', 'UserService','$modal',
        function ($scope, $location, Auth,$rootScope,User,UserService,$modal) {
        $scope.user = {};
        $scope.errors = {};
            $scope.lang=$rootScope.$stateParams.lang;

        $scope.resetPswd = function(form) {
            if(form.$valid) {
                Auth.resetPswd({
                    email: $scope.reseteEmail

                })
                    .then( function(data) {
                        console.log(data);
                        $scope.open();
                        $scope.reseteEmail='на почту отправлено письмо';
                    })
                    .catch( function(err) {
                        console.log(err);
                        err = err.data;
                        $scope.errors.other = err.message;
                    });
            }
        };

        $scope.login = function(form) {
            $scope.submittedLogin = true;

            if(form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then( function(data) {
                        /*document.cookie = "userid="+data.userid+";path=/";
                        $rootScope.user=User.get(function(user){
                            //console.log(user);
                            $.playSound('sounds/login');
                                if (user){
                                    //console.log('ddd');
                                    $rootScope.socket.emit('new user in chat',user._id);
                                    $rootScope.chats.refreshLists(true);
                                    //UserService.isLogged=true;
                                }
                        });*/

                        // Logged in, redirect to home
                        if ($rootScope.fromCart){
                            $rootScope.$state.transitionTo('language.cart',{lang:$scope.lang});
                            $rootScope.fromCart=false;
                        } else {
                            $rootScope.$state.transitionTo('language.home',{lang:$scope.lang});
                        }

                    })
                    .catch( function(err) {
                        err = err.data;
                        $scope.errors = {};
                        //console.log(err);
                        // Update validity of form fields that match the mongoose errors
                        if (err.errors){
                            angular.forEach(err.errors, function(error, field) {
                                /*console.log(error);
                                 console.log(field)*/
                                form[field].$setValidity('mongoose', false);
                                //console.log(formLogin[field]);
                                $scope.errors[field] = error.message;
                            });
                        } else {
                            alert(err.error)
                        }

                    });
            }
        };

        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                size: size

            });
            modalInstance.result.then(function () {

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
        var ModalInstanceCtrl = function ($scope, $modalInstance) {
            $scope.ok = function () {};
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };




    }])
    .controller('signupCtrl',['$scope', 'Auth',"$location",'$rootScope', '$modal','User','$http','UserService','$window',
        function ($scope, Auth,$location,$rootScope,$modal,User,$http,UserService,$window) {

            $scope.user = {};
            $scope.user.email=($rootScope.$stateParams.email)?$rootScope.$stateParams.email:'';
            $scope.errors = {};
        $scope.register = function(form) {
            $scope.submitted = true;
            yaCounter23946445.reachGoal('REGISTRATION');
            if(form.$valid) {
                Auth.createUser({
                    name: $scope.user.name,
                    email: $scope.user.email,
                    password: $scope.user.password,
                    profile: $scope.user.profile
                })
                    .then( function() {
                        $scope.open();
                    })
                    .catch( function(err) {
                        err = err.data;
                        $scope.errors = {};
                        //console.log(err);
                        // Update validity of form fields that match the mongoose errors
                        if (err.errors){
                            angular.forEach(err.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.message;
                            });
                        } else {
                            alert(err.error);
                        }

                    });


            }
        };

        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                console.log( $scope.selected);
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };
        var ModalInstanceCtrl = function ($scope, $modalInstance,items) {
            $scope.toHome = function () {
                $window.location.href='/';
            };
            $scope.toCart = function () {
                $window.location.href='/'+$rootSacope.lang+'/cart';
            };
        };
    }])

    .controller('settingsCtrl',  ['$scope', 'User', 'Auth',function ($scope, User, Auth) {
        $scope.errors = {};

        $scope.changePassword = function(form) {
            $scope.submitted = true;

            if(form.$valid) {
                Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
                    .then( function() {
                        $scope.message = 'Password successfully changed.';
                    })
                    .catch( function() {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                    });
            }
        };
    }])

    .controller('paymentCtrl',['$scope','$rootScope','Stat',function($scope,$rootScope,Stat){
        var regex = "/(<([^>]+)>)/ig";
        $scope.lang=$rootScope.$stateParams.lang;

        var page =$rootScope.$state.current.url;

        //console.log(page.substring(1));
        $scope.stuff=Stat.get({name:page.substring(1),id:'qqq'},function(res){
            if ($scope.lang=='ru'){

                $rootScope.titles.pageTitle='Женская одежда оптом и в розницу от производителя Jadone fashion - платья, туники, сарафаны.Оплата.';
                $rootScope.titles.pageKeyWords=
                    " женская одежда от производителя, оптом женский трикотаж, купить, интернет магазин, опт, оптовый, модная женская одежда, женские юбки оптом, " +
                        "женские платья , сарафаны, женские костюмы, кардиганы, розница , туники " +
                        " платья французский трикотаж, купить, оптом, беларусь, мода, стиль, россия, казахстан, фабрика, оптом купить"+
                        'стильная одежда, женская одежда оптом и в розницу, красивая одежда' +
                        'оплата способы оплаты';
                $rootScope.titles.pageDescription=res.desc0[$scope.lang].replace(regex, "");

            }
        });
    }])

    .controller('deliveryCtrl',['$scope','$rootScope','Stat',function($scope,$rootScope,Stat){
        var regex = "/(<([^>]+)>)/ig";
        $scope.lang=$rootScope.$stateParams.lang;

        var page =$rootScope.$state.current.url;

        //console.log(page.substring(1));
        $scope.stuff=Stat.get({name:page.substring(1),id:'qqq'},function(res){
            if ($scope.lang=='ru'){

                $rootScope.titles.pageTitle='Женская одежда оптом и в розницу от производителя Jadone fashion - платья, туники, сарафаны.Доставка.';
                $rootScope.titles.pageKeyWords=
                    " женская одежда от производителя, оптом женский трикотаж, купить, интернет магазин, опт, оптовый, модная женская одежда, женские юбки оптом, " +
                        "женские платья , сарафаны, женские костюмы, кардиганы, розница , туники " +
                        " платья французский трикотаж, купить, оптом, беларусь, мода, стиль, россия, казахстан, фабрика, оптом купить"+
                        'стильная одежда, женская одежда оптом и в розницу, красивая одежда' +
                        'доставка Росиия Украина';
                $rootScope.titles.pageDescription=res.desc0[$scope.lang].replace(regex, "");

            }
        });
    }])


    .controller('contactsCtrl',['$scope','$rootScope','$location','$http','$timeout','Stat',	function($scope,$rootScope,$location,$http,$timeout,Stat){
        var regex = "/(<([^>]+)>)/ig";

        $scope.lang=$rootScope.$stateParams.lang;
        var page =$rootScope.$state.current.url;

        //console.log(page.substring(1));
        $scope.stuff=Stat.get({name:page.substring(1),id:'qqq'},function(res){
            if ($scope.lang=='ru'){

                $rootScope.titles.pageTitle='Платья оптом и в розницу от производителя Jadone fashion - платья, туники, сарафаны. Контакты.';
                $rootScope.titles.pageKeyWords=
                    " платья оптом производителя украинского, оптом женский трикотаж, купить, интернет магазин, опт, оптовый, модная женская одежда, женские юбки оптом, " +
                        "женские платья , сарафаны, женские костюмы, кардиганы, розница , туники " +
                        " платья французский трикотаж, купить, оптом, беларусь, мода, стиль, россия, казахстан, фабрика, оптом купить"+
                        'стильная одежда, женская одежда оптом и в розницу, красивая одежда' +
                        'контакты, обратная связь, координаты';
                $rootScope.titles.pageDescription=res.desc0[$scope.lang].replace(regex, "");

            }
        });


        $scope.feedbackError=false;
        $scope.feedbackSent = false;

        $scope.errorText=false;
        $scope.SuccessFeedBack=false;
        $scope.feedbackDisabled=false;


        $scope.feedback={};

        $scope.feedback.email ='';
        $scope.feedback.name = '';
        $scope.feedback.text = '';




        if ($rootScope.user){
            if ($rootScope.user.email){
                // console.log($rootScope.user.email);
                $scope.feedback.email=$rootScope.user.email;
            }
            if ($rootScope.user.name)
                $scope.feedback.name=$rootScope.user.name;
        }
        /*$rootScope.watch('user',function(){
            if ($rootScope.user){
                if ($rootScope.user.email){
                    //console.log($rootScope.user.email);
                    $scope.feedback.email=$rootScope.user.email;
                }
                if ($rootScope.user.name)
                    $scope.feedback.name=$rootScope.user.name;
            }
        });
*/

        $scope.feedbackMassage = function(){
            return 	$scope.feedbackError|| $scope.feedbackSent;
        };


        $scope.send = function(form){
            //console.log($scope.feedback);
            if ($scope.feedback.text.length<10){
                $scope.errorText = true;
                $timeout(function(){$scope.errorText = false}, 3000);
            }
            else{
                $scope.feedback.text=$scope.feedback.text.substring(0,700);
                $scope.feedbackDisabled=true;
                $http.post('/api/feedback',$scope.feedback).
                    success(function(data, status) {
                        $scope.data = data;
                        //if ($scope.data.done){
                            $scope.SuccessFeedBack = true;
                            $scope.feedback.text='';
                            $timeout(function(){
                                $scope.SuccessFeedBack = false;
                                $scope.feedbackDisabled=false;
                            }, 10000);
                        /*}else{
                            $scope.feedbackError = true;
                            $timeout(function()
                            {$scope.feedbackError=false;
                                $scope.feedbackDisabled=false;
                            }, 10000);
                        }*/
                    }).
                    error(function(data, status) {
                        console.log(status);
                        console.log(data);
                        $scope.feedbackError = true;
                        $timeout(function(){$scope.feedbackError=false}, 3000);
                    });
            }

        };

    }])



    .controller('searchCtrl', ['$scope','$http','$stateParams','$filter','$sce',function ($scope,$http,$stateParams,$filter,$sce) {
        // write Ctrl here

        $scope.quantity=0;
        $scope.searchStr = $stateParams.searchStr;
        $scope.getResults = function (){
            $scope.searchStr= $scope.searchStr.substring(0,30).split(' ',2).join(' ').toLowerCase();
            $http.get('/api/goods/search/'+$stateParams.lang+'/'+$scope.searchStr).success(function (data, status, headers, config) {
                $scope.results=data;
                $scope.quantity=$scope.results.quantity;
                //$scope.quantity=$scope.results.
                $scope.results.desc=data.desc.map(function(doc){
                    var text = doc.desc[$stateParams.lang];
                    var lb='<span style="color: #ff2a27">';
                    var le ='</span>';
                    var pos = text.toLowerCase().indexOf($scope.searchStr);
                    var begin=0;end=100;
                    if (pos>50){
                        var begin =pos-50;
                        var end =pos+50
                    }
                    doc.text=text.insert(pos,lb)
                                .insert(pos+lb.length+$scope.searchStr.length,le)
                                .slice(begin,end+lb.length+$scope.searchStr.length+le.length);
                    return doc;
                })
            }).error(function (data, status, headers, config) { })
        };

        $scope.getText= function(text){
            return $sce.trustAsHtml(text);
        };
        $scope.getResults();
        //$scope.categories=$rootScope.categories;


    }])


    .controller('customOrderCtrl',['$scope','$rootScope','$stateParams','$http','$timeout','$sce','Orders','Auth','global',
        function($scope,$rootScope,$stateParams,$http,$timeout,$sce,Orders,Auth,global){

            $scope.user=global.get('user').val;
            $scope.$watch('user',function(n,o){
                if(n){
                    $scope.afterSave();
                }
            });
            /*if (Auth.isLoggedIn()){
                $timeout(function(){
                    $scope.user=Auth.isLoggedIn();
                    $scope.afterSave();
                });
            }
            $scope.$on('logout', function(event, user) {
                $scope.user=null;
                $rootScope.$state.transitionTo('language.home',{lang:$rootScope.$stateParams.lang});
            });
            $scope.$on('logged', function(event, user) {
                $timeout(function(){
                    $scope.user=user;
                    $scope.afterSave();
                });
            });*/


            //***********************************
            // управление ордерами
            //************************************
            moment.lang('ru');
            //console.log(moment.lang.language);

            $scope.goToPay = function(order){
                //console.log(order);
                var shipCost= (order.shipCost)?order.shipCost:0;
                var sum=order.sum+shipCost;
               // console.log(sum);return;
                $rootScope.$state.transitionTo('language.pay',
                    {lang:$rootScope.$stateParams.lang,num:order.num,sum:sum,currency:order.currency,desc:'Payment online store Jadone Fashion for the goods according to the order №'+order.num,kurs:order.kurs});
            };


            $scope.fromChat = ($rootScope.$stateParams.num)?$rootScope.$stateParams.num:'';

            /*$scope.orders=Orders.list({'user':$rootScope.user._id},function(res){
                console.log(res);
            });*/

            $scope.filterStatus='';
            $scope.filterNumber='';

            $scope.getTotalSum =  function(order,quantity,all){
                //console.log(order);
                var s=0;
                for (var i =0;i<order.cart.length;i++){
                    s+=(quantity>=5||order.opt)?order.cart[i].quantity*order.cart[i].price:order.cart[i].quantity*order.cart[i].retail;
                }
                if (all){
                    for (var i= 0,len=order.addInCart.length;i<len;i++){
                        for (var j= 0,l=order.addInCart[i].cart.length;j<l;j++){
                            var price=(quantity>=5||order.opt)?order.addInCart[i].cart[j].price:order.addInCart[i].cart[j].retail;
                            s +=Number(price)*Number(order.addInCart[i].cart[j].quantity);
                        }
                    }
                }
                //console.log('s-'+s);
                return s;

            };

            $scope.orderSum= function(order,q,all){
                var sum=0;
                for (var i= 0,l=order.cart.length;i<l;i++){
                    var price=(q>=5||order.opt)?order.cart[i].price:order.cart[i].retail;
                    sum +=price*order.cart[i].quantity;
                }

                if (all){
                    if (order.addInCart && order.addInCart.length){
                        for (var i= 0,len=order.addInCart.length;i<len;i++){
                            if (order.addInCart[i].cart){
                                for (var j= 0,l=order.addInCart[i].cart.length;j<l;j++){
                                    var price=(q>=5||order.opt)?order.addInCart[i].cart[j].price:order.addInCart[i].cart[j].retail;
                                    sum +=Number(price)*Number(order.addInCart[i].cart[j].quantity);
                                }
                            }
                        }
                    }
                }

                return sum;
            };


            $scope.afterSave = function(){
                $scope.orders=Orders.list({'user':$scope.user._id});
                /*if(Auth.isLoggedIn())
                    $scope.orders=Orders.list({'user':$scope.user._id},function(res){
                    //console.log(res);
                });*/
            };

            $scope.updateOrder =  function(order){

                order.$update(function(err){
                    if (err) console.log(err);
                    $scope.afterSave();
                });
            };

            $scope.deleteOrder= function(order){
                if (confirm("Удалить?")){
                    order.$delete(function(){
                        $scope.afterSave();
                    });
                }
            };

            $scope.dateConvert = function(date){
                if (date) {
                    return moment(date).format('lll');
                } else {
                    return '';
                }

            };
            $scope.goToStuff=function(stuff){
               // console.log(stuff);
                $rootScope.$state.transitionTo('language.stuff.detail',
                    {'lang':$rootScope.$stateParams.lang,'section':stuff.section,'category':stuff.category,
                        'id':stuff.stuff,'color':stuff.color,'size':stuff.size});
            }

            //$scope.afterSave();

        }])

    .controller('profileCtrl',['$scope','$rootScope','$stateParams','$http','$timeout','User','Auth','global',function($scope,$rootScope,$stateParams,$http,$timeout,User,Auth,global){
        /* if (!$rootScope.Signed) $rootScope.$state.go('language.home');*/
        //***********************************
        // редактирование профиля
        //************************************

        // смена пароля
        $scope.profile={};
        //$scope.profile.changePswdNameBtn = 'Сменить пароль';
        $scope.profile.showChangePswd =  false;
        $scope.oldPassword='';
        $scope.newPassword='';
        $scope.newPassword1='';
        $scope.changePswdSuccess = false;
        $scope.changePswdError = false;
        $scope.changePswdMatch = false;
        //$scope.changePswdMatch

        $scope.profile.changePswdF = function(){
            // console.log('info');
            if (!$scope.profile.showChangePswd)
                $scope.profile.showChangePswd = true;
            $scope.oldPassword='';
            $scope.newPassword='';
            $scope.newPassword1='';

            //$scope.profile.changePswdNameBtn = 'Отправить';
        };

        $scope.errors = {};

        $scope.changePassword = function(form) {

            if ($scope.newPassword != $scope.newPassword1){
                $scope.changePswdMatch=true;
                $timeout(function(){$scope.changePswdMatch=false},3000);
                return;
            }

            $scope.submitted = true;

            //if(form.$valid) {
            //$http.get('/api/change');//,{oldPassword:$scope.oldPassword,newPassword: $scope.newPassword });
            //$rootScope.user.$updatePswd();
            Auth.changePassword( $scope.oldPassword, $scope.newPassword )
                .then( function() {
                    console.log('ssss');
                    $scope.profile.showChangePswd = false;
                    $scope.oldPassword='';
                    $scope.newPassword='';
                    $scope.newPassword1='';
                    $scope.changePswdSuccess=true;
                    $timeout(function(){$scope.changePswdSuccess=false},3000);

                })
                .catch( function(err) {
                    err = err.data;
                    //s$scope.errors.other = err.message;
                    $scope.changePswdError=true;
                    $timeout(function(){$scope.changePswdError=false},3000);
                    $scope.errors.other = 'Incorrect password';
                });
            //}
        };

/*        $scope.user;
        if (Auth.isLoggedIn()){
            $timeout(function(){
                $scope.user=Auth.isLoggedIn();
            });
        }
        $scope.$on('logout', function(event, user) {
            $scope.user=null;
            $rootScope.$state.transitionTo('language.home',{lang:$rootScope.$stateParams.lang});
        });
        $scope.$on('logged', function(event, user) {
            $timeout(function(){
                $scope.user=user;

            });

        });*/

        $scope.user=global.get('user').val;
        /*$scope.$watch('user',function(n,o){
            if(n){
                $scope.afterSave();
            }
        });*/
        $scope.disableButtonSave = false;
        $scope.showUpdateError = false;
        $scope.showUpdateSuccess = false;

        $scope.submittedProfile = false;
        $scope.profileSave= function(formProfile) {

            $scope.submittedProfile = true;
            if(formProfile.$valid) {
                $scope.disableButtonSave = true;
                $scope.showUpdateSuccess=true;
                $scope.errors={};
                User.update($scope.user,function(res){
                    Auth.setUserProfile($scope.user.profile);
                    console.log(res);
                    if (res='OK'){
                        $timeout(function(){$scope.showUpdateSuccess=false;$scope.disableButtonSave = false;}, 3000);
                    }
                });
            }
        };

    }])



    .controller('newsCtrl', ['$scope','$rootScope','News','$q','$timeout','$location','$anchorScroll','mongoPaginator',
        function ($scope,$rootScope,News,$q,$timeout,$location,$anchorScroll,mongoPaginator) {
            $scope.lang=$rootScope.$stateParams.lang;
            $scope.newsList=[];
            //paginator
            $scope.page=0;
            //$scope.numPages=2;
            $scope.totalItems=0;


            $scope.mongoPaginator=mongoPaginator;

            $scope.row= $scope.mongoPaginator.rowsPerPage;
            $scope.page=$scope.mongoPaginator.page;

            $scope.$watch('mongoPaginator.rowsPerPage',function(){
                if ($scope.page==0){
                    $scope.getNewsList($scope.page,$scope.mongoPaginator.rowsPerPage);
                } else {
                    $scope.page=$scope.mongoPaginator.page=0
                }
            });



            var updatePage = function(){
                $scope.page=$scope.mongoPaginator.page;
            };

            mongoPaginator.registerObserverCallback(updatePage);

            $scope.$watch('page',function(n,o){
                if (n!=o){

                    $scope.getNewsList($scope.page,$scope.mongoPaginator.rowsPerPage);
                    //$scope.getStuffList(categoryId,$scope.page,$scope.mongoPaginator.rowsPerPage);
                }
            });







            //$scope.maxSize = 5;
            //$scope.perPage =3;
            var defer = $q.defer();
            var promises = [];
            $scope.getNewsList = function(page,rowsPerPage){
                $scope.newsList=[];
                if (!page){
                    $scope.page=0;
                }
                var perPage =  (rowsPerPage)?rowsPerPage:null;

                News.list({page:$scope.page,perPage:perPage},function(tempArr){
                    if ($scope.page==0 && tempArr.length>0){
                        $scope.totalItems=$scope.mongoPaginator.itemCount=tempArr.shift().index;
                    }
                    /*if ($scope.page==1 && tempArr.length>0){
                        $scope.totalItems=tempArr[0].index;
                    }*/
                    for (var i=0 ; i<=tempArr.length - 1; i++) {
                        // tempArr[i].filters=JSON.parse(tempArr[i].filters);

                        tempArr[i].desc=(tempArr[i].desc0[$scope.lang]=='')?tempArr[i].desc1:tempArr[i].desc0;
                        tempArr[i].desc[$scope.lang]= tempArr[i].desc[$scope.lang].substring(0,300);
                        //console.log(tempArr[i].desc);
                        /*if (!tempArr.desc0){

                         }*/
                        $scope.newsList.push(tempArr[i]);
                    }
                });
            };
            //Angularjs promise chain when working with a paginated collection
            //http://stackoverflow.com/questions/20171928/angularjs-promise-chain-when-working-with-a-paginated-collection
            /*$scope.loadData = function(numPage) {
                //console.log(numPage);
                if (!numPage) numPage=1;
                var deferred = $q.defer();
                var i=1;
                $scope.newsList=[];
                function loadAll() {
                    News.list({page:i},function(news){
                        //console.log(stuffs);
                        if ($scope.newsList.length<=0 && news.length>0){
                            $scope.totalItems=news[0].index;
                        }
                        for(var ii=0; ii<=news.length-1;ii++){
                            news[ii].desc=(news[ii].desc0[$scope.lang]=='')?news[ii].desc1:news[ii].desc0;
                            news[ii].desc[$scope.lang]= news[ii].desc[$scope.lang].substring(0,300);
                            $scope.newsList.push(news[ii]);
                        }
                        if(i<numPage) {
                            i++;
                            loadAll();
                        }
                        else {
                            deferred.resolve();
                        }
                    })
                }
                loadAll();
                return deferred.promise;
            };*/




            $scope.goToNews = function(news){
                //console.log('dd');
                var id =(news)?news._id:'';
                $rootScope.$state.transitionTo('mainFrame.news.detail',{'id':id});

            };



            /*$scope.setPage = function () {
                $scope.page++;
                $scope.getNewsList($scope.page);
                //console.log($scope.page);

            };*/

            //прокрутка вверх екрана
            $scope.scrollTo = function(id) {
                //console.log(id);
                $location.hash(id);
                $anchorScroll();
            };

            //$scope.getNewsList();

        }])
    .controller('newsDetailCtrl',['$scope','News','$rootScope','$timeout',function($scope,News,$rootScope,$timeout){
        $scope.lang=$rootScope.$stateParams.lang;

        $scope.news=News.get({id:$rootScope.$stateParams.id},function(res,err){
            // console.log('gfdfdfd');


        });

    }])

    .controller('chatCtrl', ['$scope','socket','$rootScope','$timeout','Chat','chats','$location','global',
        function ($scope,socket,$rootScope,$timeout,Chat,chats,$location,global) {

            // добавление списка  пользователей для выбора чата
            $scope.userNameForSearch='';
            $scope.$watch('userNameForSearch',function(n,o){
                if (n.length>2 && n.length<10) {
                    // ищем
                    //console.log(n);
                    Chat.list({query:n},function(res){
                        //console.log(res);
                        $scope.listUsers=[];
                        for (var i= 0,l=res.length;i<l;i++){
                            if (res[i]._id!=$scope.user._id){
                                $scope.listUsers.push(res[i]);
                            }
                        }

                    })
                }
            })

            $scope.user=global.get('user').val;
            $scope.lang=$rootScope.$stateParams.lang;
            //if (!$rootScope.user._id) return;
            $scope.country='';
            function myfocus(){
                $timeout(function(){
                    angular.element("#myinput").focus();
                },300)

            };
            $scope.goToOrder = function(num,id,opt){

                if ($scope.user && $scope.user.role && $scope.user.role!='user' && $scope.user._id==id){
                    //console.log(opt);
                    if (opt){
                        //console.log('dddd1');
                        window.location="/admin123/orders"
                    } else {

                        //console.log("/admin123/ordersRetail?num="+num);
                        $timeout(function(){
                            //$location.path("/admin123/ordersRetail?num="+num);
                            window.location="/admin123/ordersRetail?num="+num;
                        });

                    }
                } else {
                    $rootScope.$state.transitionTo('language.customOrder',
                        {lang:$scope.lang,num:num});
                }
          };

            $scope.activeChat=chats.activeChat;
            $scope.listUsers= chats.listUsers;
            $scope.chatList=chats.chatList;
            $scope.msgs=[];
            $scope.sendMsgBtn=false;

            $scope.$on('logged', function(event, user) {
                $scope.activeChat=chats.activeChat;
                $scope.listUsers= chats.listUsers;
                $scope.chatList=chats.chatList;
            });

            $scope.$watch('chatList',function(n,o){
                if (n && n.length && n.length==1){
                    $scope.changeChat(n[0]);
                }
            });

            $scope.selectedUser;
            $scope.$watch('selectedUser',function(){
                if ($scope.selectedUser){
                    var a = _.findWhere($scope.listUsers, {_id: $scope.selectedUser});
                    $scope.addChat(a);

                    $scope.selectedChat=$scope.selectedUser;
                    $scope.selectedUser='';
                }
            });
            $scope.changeChat = function(chat){
                //console.log(chat);
                $scope.sendMsgBtn=true;
                $scope.msgs=[];
                chats.changeChat(chat,function(res){
                    $scope.msgs=chats.msqs();
                    //chats.updateListMsgs($scope.activeChat._id,$rootScope.user._id);
                    myfocus();
                });
            };

            if ($scope.activeChat._id){
                $scope.changeChat($scope.activeChat)

            }

            $scope.addChat= function (user){
                chats.addChat(user);

                $scope.changeChat(user);


            };

            $scope.moreMsgs=function(){
                chats.moreMsgs();
            };

            $scope.sendMsg=function(msg){
                if (!msg){
                    myfocus();
                    return;
                }
                var a=msg.split(':)').join("<img src='img/smile/1.png' style='width: 30px' alt=':)'>");
                var b=a.split(':-)').join("<img src='img/smile/2.png' style='width: 30px' alt=':)'>");
                var c=b.split(';)').join("<img src='img/smile/3.png' style='width: 30px' alt=':)'>");
                var d=c.split(':(').join("<img src='img/smile/4.png' style='width: 30px' alt=':)'>");
                var e=d.split(':-(').join("<img src='img/smile/5.png' style='width: 30px' alt=':)'>");
                var f=e.split(':o').join("<img src='img/smile/6.png' style='width: 30px' alt=':)'>");
                var g=f.split(':p').join("<img src='img/smile/7.png' style='width: 30px' alt=':)'>");
                chats.sendMsg(g,function(){
                    myfocus();
                });
                $scope.msg='';
            };

            $scope.button={};
            $scope.button.editChat=false;
            $scope.deleteMsgs={};
            $scope.deleteAll=false;

            $scope.$watch('deleteAll',function(){
                if ($scope.deleteAll){
                    for (var i= 0,len=$scope.msgs.length;i<len;i++){
                        $scope.msgs[i].delete=true;
                    }

                } else {
                    for (var i= 0,len=$scope.msgs.length;i<len;i++){
                        $scope.msgs[i].delete=false;
                    }
                }
            });

            $scope.deleteMsgs=function(){

                $scope.sendMsgBtn=false;
                var msgsStr;
                if (!$scope.deleteAll){
                    var temp=[];
                    for (var i= 0,len=$scope.msgs.length;i<len;i++){
                        if ($scope.msgs[i].delete){
                            temp[temp.length]=$scope.msgs[i]._id;
                        }
                    }
                    /*for(var key in $scope.deleteMsgs) {
                        if ($scope.deleteMsgs[key]){
                            temp.push(key);
                            $scope.deleteMsgs[key]=false;
                        }
                    }*/
                    msgsStr=JSON.stringify(temp);
                    console.log(temp);
                } else {
                    msgsStr = 'all';
                }

               Chat.delete({from:$scope.user._id,to:$scope.activeChat._id,msgs:msgsStr},function(){
                   $scope.sendMsgBtn=true;
                   $scope.button.editChat=false;
                   $scope.deleteAll=false;
                   $scope.changeChat($scope.activeChat);
                   chats.updateListMsgs($scope.activeChat._id,$scope.user._id);

               });
                // clear $scope.deleteMsgs={}  $scope.deleteAll=false $scope.button.editChat=false;
            };
            $scope.deleteChat= function(user){
                if (confirm("Удалить?")){
                    Chat.delete({from:user._id,to:$scope.user._id,msgs:'chat'},function(){
                        if ($scope.activeChat._id==user._id){
                            $scope.activeChat._id='';
                            $scope.activeChat.name='';
                            $scope.sendMsgBtn=false;
                            $scope.button.editChat=false;
                            $scope.msgs=[];
                        }
                        $scope.chatList.splice($scope.chatList.indexOf(user),1);
                    })
                }
            };

            $scope.addSmile = function(smile) {
                var $smilies = {1:':)',2:':-)',3:';)',4:':(',5:':-(',6:':o',7:':p'};
                $rootScope.$broadcast('add', $smilies[smile]);
            }
    }])


    .controller('searchStuffCtrl', ['$scope','Brands','$rootScope','Category','Filters','Stuff','$q','$timeout','BrandTags','$location','$anchorScroll','mongoPaginator','global',
        function ($scope,Brands,$rootScope,Category,Filters,Stuff,$q,$timeout,BrandTags,$location,$anchorScroll,mongoPaginator,global) {

            $scope.lang=$rootScope.$stateParams.lang;
            /*function findObInArray(arr,prop,value){
                //console.log(prop,value);
                //console.log(arr)
                for (var i=0,l=arr.length;i<l;i++){
                    //console.log(arr[i][prop])
                    if (arr[i][prop]==value){
                        return arr[i];
                        break;
                    }
                }
                //console.log('???');
                return undefined;
            }*/
            $scope.categories=global.get('categories').val;
            var getCategoryName = function(id){
                return findObInArray($scope.categories,'_id',id).name[$scope.lang];
            };



            $scope.commonFilter=$rootScope.commonFilter;


            $scope.mongoPaginator=mongoPaginator;

            $scope.row= $scope.mongoPaginator.rowsPerPage;
            $scope.page=$scope.mongoPaginator.page;

            /*$scope.$watch('mongoPaginator.rowsPerPage',function(){
             if ($scope.page==0){
             if ($scope.section) {
             if (!$scope.activeBrand && !$scope.activeCategory){
             var brandId='section';
             } else {
             //console.log();
             var brandId=($scope.activeBrand)?$scope.activeBrand:0;
             }

             var categoryId=($scope.activeCategory)?$scope.activeCategory:$scope.section.id;
             if ($scope.activeBrand && !$scope.activeCategory){
             categoryId=0;
             }
             $scope.getStuffList(categoryId,brandId,$scope.page,$scope.mongoPaginator.rowsPerPage);
             }
             } else {
             $scope.page=0
             }

             })*/



            var updatePage = function(){
                $scope.page=mongoPaginator.page;
            };

            mongoPaginator.registerObserverCallback(updatePage);

            $scope.$watch('page',function(n,o){
                if (n!=o){

                    var categoryId=($scope.activeCategory)?$scope.activeCategory:$scope.section.id;
                    $scope.getStuffList(categoryId,$scope.page,$scope.mongoPaginator.rowsPerPage);
                }
            });



            $scope.stuffList=[];
            //paginator
            $scope.page=0;
            $scope.totalItems=0;
            $scope.textList='';
            $scope.headerList='';
            $scope.displayFilter=[];
           // инициализация********************************
           // $scope.rowsPerPage=($rootScope.config.perPage)?$rootScope.config.perPage:53;
            //$scope.rowsPerPage=54;
            $scope.lang=$rootScope.$stateParams.lang;
            $scope.section='category';
            $scope.categories=[];
            $scope.filterDisplay=[];
            $scope.checkfilterList=[];

            $scope.getStuffList = function(categoryId,page){
                $scope.stuffList=[];
                if (!page){
                    $scope.page=0;

                }
                var  brandId;
                if (categoryId){
                    brandId=0;
                } else {
                    categoryId=$scope.section;
                    brandId='section';
                }
                //console.log($rootScope.$stateParams);
                var searchStr=($rootScope.$stateParams.searchStr)?$rootScope.$stateParams.searchStr:'';
                function noStock(tag,stock){
                  //  console.log(stock[tag]);
                    if(stock && stock[tag]) {
                        var is = true;
                       for (var key in stock[tag]){
                          if (!stock[tag][key]){
                              is = false;
                          }
                       }
                       return is;
                    } else{
                       return false;
                    }
                }
                Stuff.list({category:categoryId,brand:brandId,page:$scope.page,searchStr:searchStr},function(tempArr){
                    //var time1 = new Date().getTime();
                    /* for (var ii=1; ii<10000000;ii++){
                     var jj= ii/13*0.546;
                     }*/

                    /*if ($scope.page==1 && tempArr.length>0){
                        $scope.totalItems=tempArr[0].index;
                    }*/

                    if ($scope.page==0 && tempArr.length>0){
                        $scope.totalItems=$scope.mongoPaginator.itemCount=tempArr.shift().index;
                    }
                    $scope.checkfilterList=[];
                    for (var i=0 ; i<=tempArr.length - 1; i++) {
                        var filtersForStatus=JSON.parse(JSON.stringify(tempArr[i].tags));
                        var stock;
                        if (tempArr[i].stock){
                            stock=JSON.parse(tempArr[i].stock);
                        }

                        var tempGallery=[];
                        _(tempArr[i].gallery).sortBy(function(obj) { return +obj.index });
                        //console.log(tempArr[i].gallery);
                        for (var j=0;j<tempArr[i].gallery.length;j++){
                            //console.log(tempArr[i].gallery[j]);
                            if (tempGallery.length<1){
                                tempGallery.push(tempArr[i].gallery[j]);
                                var l = tempArr[i].tags.indexOf(tempArr[i].gallery[j].tag._id);
                                //console.log(l);
                                if (l>-1){
                                    tempArr[i].tags.splice(l,1);
                                }
                            } else{
                                var is=false;
                                for (var k=0;k<tempGallery.length;k++){
                                    //if (is) break;
                                    if (tempGallery[k].tag._id==tempArr[i].gallery[j].tag._id){
                                        is=true;
                                        if(tempArr[i].gallery[j].index<tempGallery[k].index){
                                            tempGallery.splice(k,1);
                                            tempGallery.push(tempArr[i].gallery[j]);
                                            // is=true;
                                        }
                                    }/* else {
                                     is=true;
                                     tempGallery.push(tempArr[i].gallery[j]);
                                     }*/
                                }
                                if (!is) {
                                    tempGallery.push(tempArr[i].gallery[j]);
                                    var l = tempArr[i].tags.indexOf(tempArr[i].gallery[j].tag._id);
                                    //console.log(l);
                                    if (l>-1){
                                        tempArr[i].tags.splice(l,1);
                                    }
                                }
                            }
                        }
                        var price = (tempArr[i].priceSale)? tempArr[i].priceSale:tempArr[i].price;
                        var retail = (tempArr[i].retailSale)? tempArr[i].retailSale:tempArr[i].retail;

                        for (var j=0;j<tempArr[i].tags.length;j++){
                            if ($scope.checkfilterList.indexOf(tempArr[i].tags[j])<0){
                                $scope.checkfilterList.push(tempArr[i].tags[j]);
                            }
                        }
                        for (var j=0;j<tempGallery.length;j++){
                            var status=0;
                            // 1 - распродажа
                            // 2- новинка
                            // 3- нет в наличии
                            if (filtersForStatus.indexOf(tempGallery[j].tag._id)<0 ||
                                filtersForStatus.indexOf($scope.commonFilter.tags[2])>-1|| noStock(tempGallery[j].tag._id,stock)){
                                status=3;
                            } else if(filtersForStatus.indexOf($scope.commonFilter.tags[1])>-1){
                                status=2;
                            } else if( filtersForStatus.indexOf($scope.commonFilter.tags[0])>-1){
                                status=1;
                            }
                            var tags=JSON.parse(JSON.stringify(tempArr[i].tags));
                            tags.push(tempGallery[j].tag._id);
                            if ($scope.checkfilterList.indexOf(tempGallery[j].tag._id)<0){
                                $scope.checkfilterList.push(tempGallery[j].tag._id);
                            }
                            //console.log(tempGallery[j]);
                            $scope.stuffList.push({img:tempGallery[j].thumb,'name':tempArr[i].name[$scope.lang],
                                'color':tempGallery[j].tag.name[$scope.lang],'price':price,'retail':retail,'tags':tags,'category':tempArr[i].category,
                                'id':tempArr[i]._id,'colorId':tempGallery[j].tag._id,'status':status,'categoryName':getCategoryName(tempArr[i].category)});
                        }
                    }
                });

            };
            $scope.getStuffList('category');

            $scope.goToStuffDetail = function(item){
                //console.log(item);return;
                $rootScope.$state.transitionTo('language.stuff.detail',
                    {lang:$scope.lang,id:item.id,color:item.colorId,category:item.category,section:'section'});
            };


            $scope.setPage = function () {
                $scope.page++;
                $scope.getStuffList($scope.activeCategory,$scope.activeBrand,$scope.page);
                //console.log($scope.page);

            };

            //прокрутка вверх екрана
            $scope.scrollTo = function(id) {
                //console.log(id);
                $location.hash(id);
                $anchorScroll();
            }


        }])

    .controller('saleStuffCtrl', ['$scope','$rootScope','Stuff','$q','$timeout','BrandTags','$location','$anchorScroll','mongoPaginator','global',
        function ($scope,$rootScope,Stuff,$q,$timeout,BrandTags,$location,$anchorScroll,mongoPaginator,global) {

            $scope.lang=$rootScope.$stateParams.lang;
            /*function findObInArray(arr,prop,value){
                $scope.lang=$root$scope.$stateParams.lang;
                //console.log(prop,value);
                //console.log(arr)
                for (var i=0,l=arr.length;i<l;i++){
                    //console.log(arr[i][prop])
                    if (arr[i][prop]==value){
                        return arr[i];
                        break;
                    }
                }
                //console.log('???');
                return '';
            }*/

            $scope.categories=global.get('categories').val;
            //console.log($scope.categories)
            var getCategoryName = function(id){
                var name=findObInArray($scope.categories,'_id',id);
                if (name) {return name.name[$scope.lang]} else {return '';}
            };

            $scope.commonFilter=$rootScope.commonFilter;

            $scope.mongoPaginator=mongoPaginator;

            $scope.row= $scope.mongoPaginator.rowsPerPage;
            $scope.page=$scope.mongoPaginator.page;

            var updatePage = function(){
                $scope.page=mongoPaginator.page;
            };

            mongoPaginator.registerObserverCallback(updatePage);

            $scope.$watch('page',function(n,o){
                if (n!=o){

                    var categoryId=($scope.activeCategory)?$scope.activeCategory:$scope.section.id;
                    $scope.getStuffList(categoryId,$scope.page,$scope.mongoPaginator.rowsPerPage);
                }
            });

            $scope.stuffList=[];
            //paginator
            $scope.page=0;
            $scope.totalItems=0;
            $scope.textList='';
            $scope.headerList='';
            $scope.displayFilter=[];
            // инициализация********************************
            //$scope.rowsPerPage=($rootScope.config.perPage)?$rootScope.config.perPage:53;
            $scope.lang=$rootScope.$stateParams.lang;
            //$scope.section=$rootScope.$stateParams.section;
            $scope.section='category';
            $scope.categories=[];
            $scope.filterDisplay=[];
            $scope.checkfilterList=[];

            $scope.getStuffList = function(categoryId,page){
                $scope.stuffList=[];
                if (!page){
                    $scope.page=0;

                }
                var  brandId;
                if (categoryId){
                    brandId=0;
                } else {
                    categoryId=$scope.section;
                    brandId='section';
                }
               // console.log($rootScope.$stateParams);
                var sale=($rootScope.$stateParams.sale)?$rootScope.$stateParams.sale:'sale';
                function noStock(tag,stock){
                   // console.log(stock[tag]);
                    if(stock && stock[tag]) {
                        var is = true;
                        for (var key in stock[tag]){
                            if (!stock[tag][key]){
                                is = false;
                            }
                        }
                        return is;
                    } else{
                        return false;
                    }
                }


                Stuff.list({category:categoryId,brand:brandId,page:$scope.page,sale:sale},function(tempArr){
                    //var time1 = new Date().getTime();
                    /* for (var ii=1; ii<10000000;ii++){
                     var jj= ii/13*0.546;
                     }*/
                    /*if ($scope.page==1 && tempArr.length>0){
                        $scope.totalItems=tempArr[0].index;
                    }*/
                    if ($scope.page==0 && tempArr.length>0){
                        $scope.totalItems=$scope.mongoPaginator.itemCount=tempArr.shift().index;
                    }
                    $scope.checkfilterList=[];
                    for (var i=0 ; i<=tempArr.length - 1; i++) {
                        var filtersForStatus=JSON.parse(JSON.stringify(tempArr[i].tags));
                        var stock;
                        if (tempArr[i].stock){
                            stock=JSON.parse(tempArr[i].stock);
                        }
                        var tempGallery=[];
                        for (var j=0;j<tempArr[i].gallery.length;j++){
                            //console.log(tempArr[i].gallery[j]);
                            if (tempGallery.length<1){
                                tempGallery.push(tempArr[i].gallery[j]);
                                var l = tempArr[i].tags.indexOf(tempArr[i].gallery[j].tag._id);
                                //console.log(l);
                                if (l>-1){
                                    tempArr[i].tags.splice(l,1);
                                }
                            } else{
                                var is=false;
                                for (var k=0;k<tempGallery.length;k++){
                                    //if (is) break;
                                    if (tempArr[i].gallery[j].tag && tempGallery[k].tag._id==tempArr[i].gallery[j].tag._id){
                                        is=true;
                                        if(tempArr[i].gallery[j].index<tempGallery[k].index){
                                            tempGallery.splice(k,1);
                                            tempGallery.push(tempArr[i].gallery[j]);
                                            // is=true;
                                        }
                                    }/* else {
                                     is=true;
                                     tempGallery.push(tempArr[i].gallery[j]);
                                     }*/
                                }
                                if (!is && tempArr[i].gallery[j].tag) {
                                    tempGallery.push(tempArr[i].gallery[j]);
                                    var l = tempArr[i].tags.indexOf(tempArr[i].gallery[j].tag._id);
                                    //console.log(l);
                                    if (l>-1){
                                        tempArr[i].tags.splice(l,1);
                                    }
                                }
                            }
                        }
                        var price = (tempArr[i].priceSale)? tempArr[i].priceSale:tempArr[i].price;
                        var retail = (tempArr[i].retailSale)? tempArr[i].retailSale:tempArr[i].retail;

                        for (var j=0;j<tempArr[i].tags.length;j++){
                            if ($scope.checkfilterList.indexOf(tempArr[i].tags[j])<0){
                                $scope.checkfilterList.push(tempArr[i].tags[j]);
                            }
                        }
                        for (var j=0;j<tempGallery.length;j++){
                            var status=0;
                            // 1 - распродажа
                            // 2- новинка
                            // 3- нет в наличии
                            if (filtersForStatus.indexOf(tempGallery[j].tag._id)<0 || filtersForStatus.indexOf($scope.commonFilter.tags[2])>-1
                                || noStock(tempGallery[j].tag._id,stock)){
                                status=3;
                            } else if(filtersForStatus.indexOf($scope.commonFilter.tags[1])>-1){
                                status=2;
                            } else if( filtersForStatus.indexOf($scope.commonFilter.tags[0])>-1){
                                status=1;
                            }
                            var tags=JSON.parse(JSON.stringify(tempArr[i].tags));
                            tags.push(tempGallery[j].tag._id);
                            if ($scope.checkfilterList.indexOf(tempGallery[j].tag._id)<0){
                                $scope.checkfilterList.push(tempGallery[j].tag._id);
                            }
                            //console.log(tempGallery[j]);
                            $scope.stuffList.push({img:tempGallery[j].thumb,'name':tempArr[i].name[$scope.lang],
                                'color':tempGallery[j].tag.name[$scope.lang],'price':price,'retail':retail,'tags':tags,
                                'id':tempArr[i]._id,'colorId':tempGallery[j].tag._id,'status':status,'category':tempArr[i].category,'categoryName':getCategoryName(tempArr[i].category)});
                        }
                    }
                });

            };
            $scope.getStuffList('category');

            $scope.goToStuffDetail = function(item){
                //console.log(item); return;
                $rootScope.$state.transitionTo('language.stuff.detail',
                    {lang:$scope.lang,id:item.id,color:item.colorId,category:item.category,section:'section'});
            };


            $scope.setPage = function () {
                $scope.page++;
                $scope.getStuffList($scope.activeCategory,$scope.activeBrand,$scope.page);
            };

            //прокрутка вверх екрана
            $scope.scrollTo = function(id) {
                //console.log(id);
                $location.hash(id);
                $anchorScroll();
            }

        }])

.controller('payCtrl',['$scope','$rootScope',function($scope,$rootScope){
        if (!$rootScope.$stateParams.currency || !$rootScope.$stateParams.sum || !$rootScope.$stateParams.num) { return}
        console.log($rootScope.$stateParams);
        $scope.order={
            desc:$rootScope.$stateParams.desc,
            num:$rootScope.$stateParams.num,
            sum:$rootScope.$stateParams.sum,
            kurs:$rootScope.$stateParams.kurs,
            currency:$rootScope.$stateParams.currency,
            //publicKey:'i34349240742'
            //publicKey:'i5309796570'
            publicKey:  'i46076473203'
        };
        //$scope.order.sum *= 1;
        //$scope.order.kurs *= 1;
        $scope.order.sum = ($scope.order.sum*$scope.order.kurs).toFixed(2);
        console.log($scope.order.sum);
        console.log($scope.order.kurs);

        switch ($rootScope.$stateParams.currency){
            case "USD":
                $scope.publicKey='i5309796570';
                //$scope.order.sum = ($scope.order.sum*$scope.order.kurs).toFixed(2);
                 break;
            case "RUR":
                $scope.publicKey='i5309796570';
                //$scope.order.sum = ($scope.order.sum*$scope.order.kurs).toFixed(2);
                break;
        }



    }]);
'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  })

.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || '');
    };
})
.filter('filterSection', function (version) {
    return function(input,sectionId) {
        if (sectionId==0)
            return input;
        else {
            var temp=[];
            angular.forEach(input, function (item) {
                if (item.category== sectionId) {
                    temp.push(item);
                }
            });
            return temp;
        }
    };
});

'use strict';

/* Services */
function findById(collection,id){
    for (var i=0;i<collection.length;i++){
        if (collection[i]._id==id){
            return collection[i];
            break;
        }
    }
    return null;
};

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
     value('version', '0.1')
    //http://michaeleconroy.blogspot.com/2013_09_01_archive.html
    .provider('global',[function(){
        var _data = {}; // our data storage array
        var _urls = {}; // end urls
        this.setUrl = function(urls){
            _urls = urls;
        };
        var _set = function(what,val){
            //console.log(what,val)
            if(angular.isDefined(what)){
                if (!_data[what]){
                    _data[what]={val:null}}
                else {
                    //console.log(what,val)
                    /*if (angular.isDefined(val) && (what=='filter'||what=='filterTags')
                        && val.length && val.length>1) {
                        //console.log(what);
                        val.shift();
                    }*/
                    /*console.log(what,' ',angular.isDefined(val));
                     console.log(val);*/
                    _data[what].val=(angular.isDefined(val)) ? val: null;
                    //console.log(_data[what]);
                }
                //_data[what] = (angular.isDefined(val)) ? val/*angular.copy(val)*/ : undefined;
                return true;
            }else{
                return false;
            }
        }; // end _set

// Provider method for set
        this.set = _set;

// service methods
        this.$get = ['$http',function($http){

            return {
                request : function(url,vars){
                    if(angular.isDefined(vars)){
                        return $http.post(url,$.param(vars),{headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
                    }else{
                        return $http.get(url);
                    }
                    //return ['a','d','c']
                },

                url : function(which){
                    return _urls[which];
                }, // end url

                set : _set, // end set

                get : function(what){
                    if(angular.isDefined(what) && (what in _data))
                        return _data[what];//angular.copy(_data[what]);
                    else
                        return undefined;
                }, // end get

                del : function(what){
                    if(angular.isDefined(what)){
                        var i = _data.indexOf(what);
                        if(i >= 0)
                            return _data.splice(i,1);
                    }
                    return false;
                }, // end del

                clear : function(){
                    _data = [];
                }, // end clear
                getAll:function(){ return _data}
            };
        }]; // end $get
    }]) // end appDataStoreSrvc / storage-services


    .factory('globalSrv',['global',function(global){
        //-- Variables --//
        var _send = global.request;
        //-- Methods --//
        return {
            getData:function(name,abbr,num){
                var url = global.url(name);
                if(angular.isDefined(abbr) && !(angular.equals(abbr,null) || angular.equals(abbr,'')))
                    url += 'abbr/' + abbr + '/';
                if(angular.isDefined(num) && !(angular.equals(num,null) || angular.equals(num,'')))
                    url += 'num/' + num;
                return _send(url);
            }
        };
    }]) // end subjectSrv / module(myapp.services)



    .factory('User', function ($resource) {
        return $resource('/api/users/:id/:email', {
            id: '@id'
        }, { //parameters default
            update: {
                method: 'PUT',
                params: {
                    id:'profile',
                    email:''
                }
            },
            updatePswd: {
                method: 'PUT',
                params: {
                    // id:'profile'
                    id:'changepswd',
                    email:''
                }
            },
            resetPswd: {
                method: 'POST',
                params: {
                    id:'resetpswd',
                    email:'@email'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id:'me',
                    email:''
                }
            }
        });
    })
    .factory('UserService',[function(){
        var sdo={
            isLogged:false
        };
        return sdo;
    }])

.factory('Session',['$resource', function ($resource) {
        return $resource('/api/session/');
    }])

    .factory('Chat',['$resource', function($resource){
        return $resource('/api/chat/:from/:to', {}, {
            list: {method:'GET', isArray: true, params:{id:''}},
            delete: {method:'DELETE',params: {}}
            /*add: {method:'POST',params:{id:''}},
            update: {method:'PUT',params: {id: ''}},
            delete: {method:'DELETE',params: {id: '@_id'}},
            get:{method:'GET', params: {id: '@id'}}*/
        });
    }])

.factory('Auth',['$timeout', '$rootScope', 'Session', 'User', 'global',
        function Auth($timeout, $rootScope, Session, User,global) {

        // Get currentUser from cookie
       /* $rootScope.currentUser = $cookieStore.get('user') || null;
        $cookieStore.remove('user');*/

        //console.log($rootScope.currentUser);
        var user={},that=this;
           // user= global.get('user');
        /*User.get(function(aUser){
            if (!aUser._id && aUser.id) { aUser._id=aUser.id;}
            if (!aUser.id && aUser._id) { aUser.id=aUser._id;}
            if (aUser._id){
                user= aUser;
                $timeout(function(){$rootScope.$broadcast('logged', user);},100)
            }

        });*/

        return {

            /**
             * Authenticate user
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function(userInfo, callback) {
                var cb = callback || angular.noop;
                //console.log(userInfo);
                return Session.save({
                    email: userInfo.email,
                    password: userInfo.password,
                    name:userInfo.name
                }, function(aUser) {
                    //setUser(aUser);
                    if (!aUser._id && aUser.id) { aUser._id=aUser.id};
                    if (!aUser.id && aUser._id) { aUser.id=aUser._id;}
                    user=aUser;
                    $rootScope.$broadcast('logged', user);
                    //console.log(that.user)
                    return cb();
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Unauthenticate user
             *
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            logout: function(callback) {
                var cb = callback || angular.noop;
                return Session.delete(function() {
                        user=null;
                        $rootScope.$broadcast('logout', user);
                        return cb();
                    },
                    function(err) {
                        return cb(err);
                    }).$promise;
            },

            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            createUser: function(userInfo, callback) {
                var cb = callback || angular.noop;
               return User.save(userInfo,
                    function(aUser) {
                        if (!aUser._id && aUser.id) { aUser._id=aUser.id;}
                        if (!aUser.id && aUser._id) { aUser.id=aUser._id;}
                        //user=aUser;
                        $rootScope.$broadcast('logged', user);
                        return cb();
                        // авторизация сразу после регистрации
                        /*Session.save({
                            email: userInfo.email,
                            password: userInfo.password
                        },function(aUser){
                            if (!aUser._id && aUser.id) { aUser._id=aUser.id;}
                            if (!aUser.id && aUser._id) { aUser.id=aUser._id;}
                            user=aUser;
                            return cb();
                        })*/

                    },
                    function(err) {
                        return cb(err);
                    }).$promise;
            },

            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional
             * @return {Promise}
             */
            changePassword: function(oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;

                return User.updatePswd({
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function(aUser) {
                    return cb(aUser);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },
            resetPswd: function( email,callback) {
                var cb = callback || angular.noop;
                return User.resetPswd(email, function(aUser) {
                    return cb(aUser);
                }, function(err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            currentUser: function() {
                return user;
            },

            setUserProfile :function(profile){
                user.profile=profile;
            },

            /**
             * Simple check to see if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function(){
                //console.log(user.id);
                return(user && user.id)? user : false;
            }
        };
    }])

    .factory('Config',['$resource', function ($resource) {
        return $resource('/api/config');
    }])

    .factory('Filters',['$resource', function($resource){
        return $resource('/api/filters/:id', {}, {
            list: {method:'GET', isArray: true, params:{id:''}},
            add: {method:'POST',params:{id:''}},
            update: {method:'PUT',params: {id: ''}},
            delete: {method:'DELETE',params: {id: '@_id'}},
            get:{method:'GET', params: {id: '@id'}}
        });
    }])
    .factory('Tags',['$resource', function($resource){
        return $resource('/api/tag/:filter/:id', {}, {
            list: {method:'GET', isArray: true, params:{filter:'@filter',id:''}},
            add: {method:'POST',params:{filter:'@filter',id:''}},
            update: {method:'PUT',params: {filter:'@filter',id: ''}},
            delete: {method:'DELETE',params: {filter:'@filter',id: '@_id'}},
            get:{method:'GET', params: {filter:'filter',id: '@id'}}
        });
    }])

    .factory('BrandTags',['$resource', function($resource){
        return $resource('/api/brandtags/:brand/:id', {}, {
            list: {method:'GET', isArray: true, params:{brand:'@brand',id:''}},
            add: {method:'POST',params:{brand:'',id:''}},
            update: {method:'PUT',params: {brand:'',id: ''}},
            delete: {method:'DELETE',params: {brand:'@brand',id: '@_id'}},
            get:{method:'GET', params: {brand:'brand',id: '@_id'}}
        });
    }])

    .factory('Brands',['$resource', function($resource){
        return $resource('/api/brand/:_id', {}, {
            list: {method:'GET', isArray: true, params:{_id:''}},
            add: {method:'POST',params:{_id:''}},
            update: {method:'PUT',params: {_id: ''}},
            delete: {method:'DELETE',params: {_id: '@_id'}},
            get:{method:'GET', params: {_id: '@_id'}}
        });
    }])

    .factory('BrandTags',['$resource', function($resource){
        return $resource('/api/brandtags/:brand/:id', {}, {
            list: {method:'GET', isArray: true, params:{brand:'@brand',id:''}},
            add: {method:'POST',params:{brand:'',id:''}},
            update: {method:'PUT',params: {brand:'',id: ''}},
            delete: {method:'DELETE',params: {brand:'@brand',id: '@_id'}},
            get:{method:'GET', params: {brand:'brand',id: '@_id'}}
        });
    }])
    .factory('Category',['$resource', function($resource){
        return $resource('/api/category/:_id', {}, {
            list: {method:'GET', isArray: true, params:{_id:''}},
            add: {method:'POST',params:{_id:''}},
            update: {method:'PUT',params: {_id: ''}},
            delete: {method:'DELETE',params: {_id: '@_id'}},
            get:{method:'GET', params: {_id: '@_id'}}
        });
    }])

    .factory('Comment',['$resource', function($resource){
        return $resource('/api/commentStuff/:stuff/:_id', {}, {
            list: {method:'GET', isArray: true, params:{stuff:"@stuff",_id:''}},
            add: {method:'POST',params:{stuff:"",_id:''}},
            update: {method:'PUT',params: {stuff:"",_id: ''}},
            delete: {method:'DELETE',params: {stuff:"",_id: '@_id'}},
            get:{method:'GET', params: {stuff:"stuff",_id: '@_id'}}
        });
    }])

    .factory('Stuff',['$resource', function($resource){
        return $resource('/api/stuff/:category/:brand/:id', {}, {
            list: {method:'GET', isArray: true, params:{category:'@category',brand:'@brand',id:''}},
            add: {method:'POST',params:{category:'category',brand:'brand',id:''}},
            update: {method:'PUT',params: {category:'category',brand:'brand',id:''}},
            updateGallery: {method:'PUT',params: {category:'category',brand:'brand',id:'gallery'}},
            delete: {method:'DELETE',params: {category:'category',brand:'brand',id:'@_id'}},
            get:{method:'GET', params: {category:'category',brand:'brand',id:'@_id'}},
            full:{method:'GET', params: {category:'category',brand:'brand',id:'@_id'}}
        });
    }])

    .factory('Country',['$resource', function($resource){
        return $resource('/api/country/:id', {}, {
            list: {method:'GET', isArray: true, params:{id:''}},
            add: {method:'POST',params:{id:''}},
            update: {method:'PUT',params: {id: ''}},
            delete: {method:'DELETE',params: {id: '@_id'}},
            get:{method:'GET', params: {id: '@_id'}}
        });
    }])
    .factory('Region',['$resource', function($resource){
        return $resource('/api/region/:country/:id', {}, {
            list: {method:'GET', isArray: true, params:{country:'@country',id:''}},
            add: {method:'POST',params:{country:'country',id:''}},
            update: {method:'PUT',params: {country:'country',id: ''}},
            delete: {method:'DELETE',params: {country:'country',id: '@_id'}},
            get:{method:'GET', params: {country:'country',id: '@_id'}}
        });
    }])
    .factory('City',['$resource', function($resource){
        return $resource('/api/city/:region/:id', {}, {
            list: {method:'GET', isArray: true, params:{region:'@region',id:''}},
            add: {method:'POST',params:{region:'region',id:''}},
            update: {method:'PUT',params: {region:'region',id: ''}},
            delete: {method:'DELETE',params: {region:'region',id: '@_id'}},
            get:{method:'GET', params: {region:'region',id: '@_id'}}
        });
    }])

    .factory('Orders',['$resource', function($resource){
        return $resource('/api/order/:id', {}, {
            list: {method:'GET', isArray: true, params:{id:''}},
            add: {method:'POST',params:{id:''}},
            update: {method:'PUT',params: {id: ''}},
            delete: {method:'DELETE',params: {id: '@_id'}},
            get:{method:'GET', params: {id: '@_id'}}
        });
    }])

    .factory('News',['$resource', function($resource){
        return $resource('/api/news/:id', {}, {
            list: {method:'GET', isArray: true, params:{id:''}},
            add: {method:'POST',params:{id:''}},
            update: {method:'PUT',params: {id:''}},
            updateGallery: {method:'PUT',params: {id:'gallery'}},
            delete: {method:'DELETE',params: {id:'@_id'}},
            get:{method:'GET', params: {id:'@_id'}}
            //full:{method:'GET', params: {id:'@_id'}},
        });
    }])



    .factory('Stat',['$resource', function($resource){
        return $resource('/api/stat/:id', {}, {
            list: {method:'GET', isArray: true, params:{id:''}},
            add: {method:'POST',params:{id:''}},
            update: {method:'PUT',params: {id:''}},
            delete: {method:'DELETE',params: {id:'@_id'}},
            get:{method:'GET', params: {id:'@_id'}},
        });
    }])

    .factory('CartLocal',['localStorage','$http','$rootScope','$filter','$timeout','$location', function(localStorage,$http,$rootScope,$filter,$timeout,$location){
        var self = this;
        self.sum;
        self.quantity;
        //console.log('dddd');
        var cartItems = [];
        var cartItems = localStorage.get('cart');


        var cartComment='';

        var sendOrder= true;
        var items = cartCount();
        //console.log(items);

        var divider = 1;

        function list(){
            return cartItems;
        }
        function cartCount(){
            var i=0;
            cartItems.forEach(function(item){
                //console.log(item.quantity);
                if(item.quantity)
                    i +=Number(item.quantity);
            });
            return i;
        }

        function getCount(itemTo){
            //console.log('ss');
            var count = 1;
            cartItems.forEach(function(current){
                if (current.size == itemTo.size && current.stuff == itemTo.stuff && current.color == itemTo.color){
                    count = current.quantity;
                }
            });
            return count;
        }

        function addToCart(itemTo){
            //console.log(itemTo);
            var itemFound = false;

            cartItems.forEach(function(current){
                //console.log(current);

                if (current.size == itemTo.size && current.stuff == itemTo.stuff && current.color == itemTo.color){
                    current.quantity = itemTo.quantity;
                    //console.log(current.quantity);
                    itemFound=true;
                }
            });

            if (!itemFound){
                //item.quantity;
                var itemToCart= new Object;
                itemToCart = JSON.parse(JSON.stringify(itemTo));

                cartItems.push(itemToCart);
            }

            localStorage.set('cart', cartItems);
            localStorage.set('cart-count',items);
            //$rootScope.itemsOnCart = items;
        };

        function getItem(i){
            return cartItems[i];
        }
        function getItems(){
            return cartItems;
        }

        function save(){
            localStorage.set('cart', cartItems);
        }


        function getTotalSum(){

            var sum=0;
            var i = cartCount();
            cartItems.forEach(function(c){
                var q = (i>=5)? c.price: c.retail;
                sum += q * c.quantity;
            });
            //console.log(grandTotal);
            return sum;

        }

        /*function getSum(current){

            var i;

            if  (current.price){
                i=Number(current.new_price);
            } else{
                i=Number(current.price);
            }

            return i * Number(current.quantity);

        }*/


        function clearCart(){
            //console.log('ssss');
            cartItems = [];
            save();


        }


        function removeItem(i){
            cartItems.splice(i,1);
            save();
        }


        function send(arg,callback){
            //console.log($rootScope)
            var lang=arg.lang,
                comment =arg.comment,
                kurs=arg.kurs,
                currency=arg.currency,
                profile=arg.profile,
                shipper=arg.shipper,
                shipperOffice=arg.shipperOffice,
                user=arg.user;
           /* self.quantity=cartCount();
            self.sum:*/
            //var ss = $rootScope.user.profile.country.toLowerCase();
            //var country = (ss=='украина' || ss=="україна")?'UA':"ELSE";
            var country =profile.countryId;
            var order={
                'cart':cartItems,
                'comment':comment,
                'lang':lang,
                'user':user,
                'quantity':cartCount(),
                'sum':getTotalSum(),
                'kurs':kurs,
                'currency':currency,
                //'address':profile.address,
                fio:profile.fio,
                country:country,
                profile:profile,
                shipper:shipper,
                shipperOffice:shipperOffice
            };
            //console.log(order);return;
            $http.post('/api/order',order).then(
                function (resp) {
                    console.log(resp.data);
                    callback(false,resp.data);
                    /*if (resp.data.done){
                        *//*cartItems = [];
                        save();*//*
                        callback(false,resp.data);
                    } else {
                        callback(resp.data.err);
                    }*/
                },
                function(err){
                    callback(err.data);
                })


        };




        return{
            addToCart:addToCart,
            list:list,
            cartCount:cartCount,
            getCount : getCount,
            getItem:getItem,
            getItems:getItems,
            getTotalSum:getTotalSum,
            save:save,
            clearCart:clearCart,
            removeItem:removeItem,
            send:send
        }
    }])

    .factory('localStorage', function(){
        var APP_ID =  'fraim-local-storage';

        // api exposure
        return {
            // return item value
            getB: function(item){

                return JSON.parse(localStorage.getItem(item) || 'false');
            },
            // return item value
            getN: function(item){
                var i = localStorage.getItem(item);
                if (i!='undefined'){
                    return JSON.parse(i)
                }
                else
                    return '';
            },
            // return item value
            get: function(item){
                return JSON.parse(localStorage.getItem(item) || '[]');
            },
            set: function(item, value){
                // set item value
                localStorage.setItem(item, JSON.stringify(value));
            }

        };

    })


    .factory('socket', function (socketFactory) {
        return socketFactory();
    })

    .provider('chats', function () {

       return {
           world: 'World',
           listUsers : [],
           activeChat:{},
           chatList :[],

            $get: function(socket,Chat,$rootScope,$timeout,global) {

                var that=this;
                var msgs =[];
                var user = global.get('user');
                //console.log(user);
                //activeChat={};
                //var chatList =[];
                    //listUsers=[];

                function clearArray(A){
                    while(A.length > 0) {
                        A.pop();
                    }
                }



                function refreshLists(user,logout){
                    //console.log(user);
                    clearArray(that.chatList);
                    clearArray(that.listUsers);
                    if (logout) return;
                    if (!that.activeChat['_id'] || !enter){
                        that.activeChat['_id']='';
                        that.activeChat['name']='';
                        that.activeChat['more']=false;
                        that.activeChat['page']=1;
                    }

                    //console.log(user)
                    Chat.list({from:user._id},function(res){
                        //console.log(res);
                        for (var i= 0,l=res.length;i<l;i++){
                            that.chatList.push(res[i]);
                        }
                    });
                    if (user.role=='admin'){
                        /*Chat.list(function(res){
                            //console.log(res);
                            for (var i= 0,l=res.length;i<l;i++){
                                that.listUsers.push(res[i]);
                            }

                        })*/

                    }
                }

                /*function changeUser(enter){
                    refreshLists(enter)
                    if (enter){
                        socket.emit('new user in chat',$rootScope.user._id);
                    } else {
                        socket.emit('delete user from chat');
                    }
                }*/



                socket.on('who are you',function(cb){
                    //console.log('who are you');
                    var id = (user.val && user.val._id)?user.val._id:'user not auth';
                    //console.log(id);
                    cb(id);
                });

               socket.on('new:msg',function(data,cb){

                   //console.log(data);
                   var from= data.from;
                   var to= data.to;
                   var status=true;
                   if (from!=user._id){
                       $.playSound('sounds/chat');
                   }
                   //console.log("$rootScope.$state.includes('language.chat') = "+$rootScope.$state.includes('language.chat'));
                    if ($rootScope.$state.includes('language.chat')){
                        if (to==that.activeChat._id || from==that.activeChat._id){

                           if (from==user.val._id){
                                var name =user.val.name;
                                var clas=true;
                                var item= to;
                            } else{
                                var name =that.activeChat.name;
                                var clas=false;
                                var item= from;
                            }
                            msgs[msgs.length]={name:name,msg:data.msg,date:data.date,class:clas,delete:false,_id:data._id};
                            //console.log({name:name,msg:data.msg,date:data.date,class:clas,delete:false,_id:data._id});
                        } else  {
                            status=false;
                        }
                        cb({cb:'cb from chat controller have read',status:status});
                    } else{
                        status=false;
                        cb({cb:"from mainFraim don't read",status:false});
                    }
                   //console.log(status);
                   if (!status && from==user.val._id  && !_.findWhere(that.chatList, {_id: data.to})){
                      // console.log('refreshList');
                       refreshLists(true);
                   }
                   if (!status && from!=user.val._id){ // not read
                       //console.log('ssssss');
                       if (_.findWhere(that.chatList, {_id: data.from})){
                           _.findWhere(that.chatList, {_id: data.from}).newMsg++;
                       } else { // there is not chat
                           refreshLists(true,function(){
                               /*console.log('add in chatList');
                               _.findWhere(that.chatList, {_id: data.from}).newMsg++;*/
                           });

                       }
                   }

                });


                function changeChat(chat,cb){
                    clearArray(msgs);

                    that.activeChat['_id']=chat._id;
                    that.activeChat['name']=chat.name;
                    that.activeChat['more']=false;
                    that.activeChat['page']=1;


                    _.findWhere(that.chatList, {_id: chat._id}).newMsg=0; // ????
                    //console.log(user);
                    Chat.list({from:user.val._id,to:that.activeChat._id,page:that.activeChat['page']},function(res){
                        //console.log(res);
                        var arr=[];
                        if (res[0]){
                            that.activeChat['more']=res[0].more;
                            _.findWhere(that.chatList, {_id: chat._id}).newMsg=res[0].newMsg;
                        }

                        //console.log(res[0]);
                        res.forEach(function(el){
                            if (el.user==that.activeChat._id){
                                el.name=that.activeChat.name;
                                el.class=false;
                            }else{
                                el.class=true;
                                el.name=user.val.name;
                            }
                            el.date=el.created;
                            el.delete=false;
                            msgs[msgs.length]=el;
                            //console.log(msgs);
                        });
                        //console.log(msgs);

                        if (cb){
                            cb(arr)
                        }

                        //console.log(msgs[chat._id].length);
                        //massages=$scope.msgs[chat._id];msgs[chat._id]
                    });
                }

                function moreMsgs(){
                    that.activeChat['page']++;
                    Chat.list({from:user.val._id,to:that.activeChat._id,page:that.activeChat['page'],last:msgs[0]._id},function(res){
                        var arr=[];
                        if (res[0]){
                            that.activeChat['more']=res[0].more;
                            _.findWhere(that.chatList, {_id: that.activeChat._id}).newMsg=res[0].newMsg;
                        }
                        res.forEach(function(el){
                            if (el.user==that.activeChat._id){
                                el.name=that.activeChat.name;
                                el.class=false;
                            }else{
                                el.class=true;
                                el.name=user.val.name;
                            }
                            el.date=el.created;
                            arr.push(el);
                        });
                        //console.log(arr);
                        for(var i=arr.length-1;i>=0;i--){
                            msgs.unshift(arr[i]);
                        }
                    });

                }


                function sendMsg(msg,cb){
                    socket.emit('new:msg',{from:user.val._id,to:that.activeChat._id,msg:msg});
                    cb();
                }

                function getMsgs(){
                    if (that.activeChat._id){
                        return msgs;
                    } else {
                        return  [];
                    }
                }
                /*function getlistUsers(){
                    return that.listUsers;
                }
                function getchatList(){
                    return chatList;
                }*/
                function addChat(user){
                    //console.log(user);
                    if(_.findWhere(that.chatList, {_id: user._id})){
                        //console.log('is chat');
                        _.findWhere(that.chatList, {_id: user._id}).newMsg=0;
                    } else {
                        user.newMsg=0;
                        that.chatList.push(user);
                    }


                }
                function updateListMsgs(to,from){
                    socket.emit('updateListMsgs',{to:to,from:from});
                }


                return {
                    sendMsg:sendMsg,
                    changeChat:changeChat,
                    listUsers:that.listUsers,
                   // listUsers1:listUsers,
                    world:this.world,
                    msqs:getMsgs,
                    chatList:that.chatList,
                    addChat:addChat,
                    activeChat:that.activeChat,
                    moreMsgs:moreMsgs,
                    updateListMsgs:updateListMsgs,
                    //changeUser:changeUser,
                    refreshLists:refreshLists
                }
            }
       }


    });

