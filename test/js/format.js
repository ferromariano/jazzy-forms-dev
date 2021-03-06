$(document).ready(function(){

module("Formatter class");

test("formatting output element", function() {
  var element_types = { "igor": "f", "resig": "n" };
  var types = new Jzzf_Types();
  var funny_format = {
    "prefix": "%(",
    "postfix": ")",
    "fixed": false,
    "decimals": 9,
    "zeros": 0,
    "thousands": ".",
    "point": ","
  };
  var params = {
    "igor": funny_format,
    "resig": funny_format
  };
  var formatter = new Jzzf_Formatter(types, element_types, params);
  equal(formatter.format("igor", types.value(123.4)), "%(123,4)");
  equal(formatter.format("resig", types.value(123.4)), "123.4");
  equal(formatter.format("stranger", types.value(123.4)), "123.4");
  equal(formatter.format("igor", types.value("")), ""); // no conversion "" => 0!
});

test("format non-numeric", function() {
  params = {"prefix": "", "postfix": "", "fixed": false, "decimals": 9, "zeros": 0, "thousands": "", "point": "."};
  var types = new Jzzf_Types();
  var element_types = { "igor": "f" };
  var formatter = new Jzzf_Formatter(types, element_types, params);
  equal(formatter.format("igor", types.value("123k")), "123k");
});

module("Format");

test("normal", function() {
  params = {"prefix": "", "postfix": "", "fixed": false, "decimals": 9, "zeros": 0, "thousands": "", "point": "."}
  
  equal(jzzf_format(0                     , params), "0")
  equal(jzzf_format(0.0000000001          , params), "0")
  equal(jzzf_format(0.0000000009          , params), "0.000000001")
  equal(jzzf_format(0.1                   , params), "0.1")
  equal(jzzf_format(0.123                 , params), "0.123")
  equal(jzzf_format(0.123456789           , params), "0.123456789")
  equal(jzzf_format(1                     , params), "1")
  equal(jzzf_format(1.1                   , params), "1.1")
  equal(jzzf_format(1.123                 , params), "1.123")
  equal(jzzf_format(1.123456789           , params), "1.123456789")
  equal(jzzf_format(123                   , params), "123")
  equal(jzzf_format(123.1                 , params), "123.1")
  equal(jzzf_format(123.123               , params), "123.123")
  equal(jzzf_format(123.123456789         , params), "123.123456789")
  equal(jzzf_format(12345                 , params), "12345")
  equal(jzzf_format(12345.1               , params), "12345.1")
  equal(jzzf_format(12345.123             , params), "12345.123")
  equal(jzzf_format(12345.123456789       , params), "12345.123456789")
  equal(jzzf_format(-0.1                  , params), "-0.1")
  equal(jzzf_format(-0.123                , params), "-0.123")
  equal(jzzf_format(-0.123456789          , params), "-0.123456789")
  equal(jzzf_format(-1                    , params), "-1")
  equal(jzzf_format(-1.1                  , params), "-1.1")
  equal(jzzf_format(-1.123                , params), "-1.123")
  equal(jzzf_format(-1.123456789          , params), "-1.123456789")
  equal(jzzf_format(-123                  , params), "-123")
  equal(jzzf_format(-123.1                , params), "-123.1")
  equal(jzzf_format(-123.123              , params), "-123.123")
  equal(jzzf_format(-123.123456789        , params), "-123.123456789")
  equal(jzzf_format(-12345               , params), "-12345")
  equal(jzzf_format(-12345.1             , params), "-12345.1")
  equal(jzzf_format(-12345.123           , params), "-12345.123")
  equal(jzzf_format(-12345.123456789     , params), "-12345.123456789")
});

test("non-english", function() {
  params = {"prefix": "", "postfix": "", "fixed": false, "decimals": 9, "zeros": 0, "thousands": ".", "point": ","}

  equal(jzzf_format(0                     , params), "0")
  equal(jzzf_format(0.0000000001          , params), "0")
  equal(jzzf_format(0.0000000009          , params), "0,000000001")
  equal(jzzf_format(0.1                   , params), "0,1")
  equal(jzzf_format(0.123                 , params), "0,123")
  equal(jzzf_format(0.123456789           , params), "0,123456789")
  equal(jzzf_format(1                     , params), "1")
  equal(jzzf_format(1.1                   , params), "1,1")
  equal(jzzf_format(1.123                 , params), "1,123")
  equal(jzzf_format(1.123456789           , params), "1,123456789")
  equal(jzzf_format(123                   , params), "123")
  equal(jzzf_format(123.1                 , params), "123,1")
  equal(jzzf_format(123.123               , params), "123,123")
  equal(jzzf_format(123.123456789         , params), "123,123456789")
  equal(jzzf_format(12345                 , params), "12.345")
  equal(jzzf_format(12345.1               , params), "12.345,1")
  equal(jzzf_format(12345.123             , params), "12.345,123")
  equal(jzzf_format(12345.123456789       , params), "12.345,123456789")
  equal(jzzf_format(-0.1                  , params), "-0,1")
  equal(jzzf_format(-0.123                , params), "-0,123")
  equal(jzzf_format(-0.123456789          , params), "-0,123456789")
  equal(jzzf_format(-1                    , params), "-1")
  equal(jzzf_format(-1.1                  , params), "-1,1")
  equal(jzzf_format(-1.123                , params), "-1,123")
  equal(jzzf_format(-1.123456789          , params), "-1,123456789")
  equal(jzzf_format(-123                  , params), "-123")
  equal(jzzf_format(-123.1                , params), "-123,1")
  equal(jzzf_format(-123.123              , params), "-123,123")
  equal(jzzf_format(-123.123456789        , params), "-123,123456789")
  equal(jzzf_format(-12345                , params), "-12.345")
  equal(jzzf_format(-12345.1              , params), "-12.345,1")
  equal(jzzf_format(-12345.123            , params), "-12.345,123")
  equal(jzzf_format(-12345.123456789      , params), "-12.345,123456789")
});

test("units", function() {

  params = {"prefix": "$", "postfix": "avg", "fixed": false, "decimals": 9, "zeros": 0, "thousands": "", "point": "."}
  equal(jzzf_format(0                     , params), "$0avg")
  equal(jzzf_format(0.0000000001          , params), "$0avg")
  equal(jzzf_format(0.0000000009          , params), "$0.000000001avg")
  equal(jzzf_format(0.1                   , params), "$0.1avg")
  equal(jzzf_format(0.123                 , params), "$0.123avg")
  equal(jzzf_format(0.123456789           , params), "$0.123456789avg")
  equal(jzzf_format(1                     , params), "$1avg")
  equal(jzzf_format(1.1                   , params), "$1.1avg")
  equal(jzzf_format(1.123                 , params), "$1.123avg")
  equal(jzzf_format(1.123456789           , params), "$1.123456789avg")
  equal(jzzf_format(123                   , params), "$123avg")
  equal(jzzf_format(123.1                 , params), "$123.1avg")
  equal(jzzf_format(123.123               , params), "$123.123avg")
  equal(jzzf_format(123.123456789         , params), "$123.123456789avg")
  equal(jzzf_format(12345                 , params), "$12345avg")
  equal(jzzf_format(12345.1               , params), "$12345.1avg")
  equal(jzzf_format(12345.123             , params), "$12345.123avg")
  equal(jzzf_format(12345.123456789       , params), "$12345.123456789avg")
  equal(jzzf_format(-0.1                  , params), "-$0.1avg")
  equal(jzzf_format(-0.123                , params), "-$0.123avg")
  equal(jzzf_format(-0.123456789          , params), "-$0.123456789avg")
  equal(jzzf_format(-1                    , params), "-$1avg")
  equal(jzzf_format(-1.1                  , params), "-$1.1avg")
  equal(jzzf_format(-1.123                , params), "-$1.123avg")
  equal(jzzf_format(-1.123456789          , params), "-$1.123456789avg")
  equal(jzzf_format(-123                  , params), "-$123avg")
  equal(jzzf_format(-123.1                , params), "-$123.1avg")
  equal(jzzf_format(-123.123              , params), "-$123.123avg")
  equal(jzzf_format(-123.123456789        , params), "-$123.123456789avg")
  equal(jzzf_format(-12345                , params), "-$12345avg")
  equal(jzzf_format(-12345.1              , params), "-$12345.1avg")
  equal(jzzf_format(-12345.123            , params), "-$12345.123avg")
  equal(jzzf_format(-12345.123456789      , params), "-$12345.123456789avg")
});

test("two decimals", function() {
  params = {"prefix": "", "postfix": "", "fixed": false, "decimals": 2, "zeros": 0, "thousands": "", "point": "."};
  
  equal(jzzf_format(0                     , params), "0")
  equal(jzzf_format(0.0000000001          , params), "0")
  equal(jzzf_format(0.0000000009          , params), "0")
  equal(jzzf_format(0.1                   , params), "0.1")
  equal(jzzf_format(0.123                 , params), "0.12")
  equal(jzzf_format(0.123456789           , params), "0.12")
  equal(jzzf_format(1                     , params), "1")
  equal(jzzf_format(1.1                   , params), "1.1")
  equal(jzzf_format(1.123                 , params), "1.12")
  equal(jzzf_format(1.123456789           , params), "1.12")
  equal(jzzf_format(123                   , params), "123")
  equal(jzzf_format(123.1                 , params), "123.1")
  equal(jzzf_format(123.123               , params), "123.12")
  equal(jzzf_format(123.123456789         , params), "123.12")
  equal(jzzf_format(12345                 , params), "12345")
  equal(jzzf_format(12345.1               , params), "12345.1")
  equal(jzzf_format(12345.123             , params), "12345.12")
  equal(jzzf_format(12345.123456789       , params), "12345.12")
  equal(jzzf_format(-0.1                  , params), "-0.1")
  equal(jzzf_format(-0.123                , params), "-0.12")
  equal(jzzf_format(-0.123456789          , params), "-0.12")
  equal(jzzf_format(-1                    , params), "-1")
  equal(jzzf_format(-1.1                  , params), "-1.1")
  equal(jzzf_format(-1.123                , params), "-1.12")
  equal(jzzf_format(-1.123456789          , params), "-1.12")
  equal(jzzf_format(-123                  , params), "-123")
  equal(jzzf_format(-123.1                , params), "-123.1")
  equal(jzzf_format(-123.123              , params), "-123.12")
  equal(jzzf_format(-123.123456789        , params), "-123.12")
  equal(jzzf_format(-12345               , params), "-12345")
  equal(jzzf_format(-12345.1             , params), "-12345.1")
  equal(jzzf_format(-12345.123           , params), "-12345.12")
  equal(jzzf_format(-12345.123456789     , params), "-12345.12")
});

test("cents", function() {
  params = {"prefix": "", "postfix": "", "fixed": true, "decimals": 2, "zeros": 0, "thousands": "", "point": "."}

  equal(jzzf_format(0                     , params), "0.00")
  equal(jzzf_format(0.0000000001          , params), "0.00")
  equal(jzzf_format(0.0000000009          , params), "0.00")
  equal(jzzf_format(0.1                   , params), "0.10")
  equal(jzzf_format(0.123                 , params), "0.12")
  equal(jzzf_format(0.123456789           , params), "0.12")
  equal(jzzf_format(1                     , params), "1.00")
  equal(jzzf_format(1.1                   , params), "1.10")
  equal(jzzf_format(1.123                 , params), "1.12")
  equal(jzzf_format(1.123456789           , params), "1.12")
  equal(jzzf_format(123                   , params), "123.00")
  equal(jzzf_format(123.1                 , params), "123.10")
  equal(jzzf_format(123.123               , params), "123.12")
  equal(jzzf_format(123.123456789         , params), "123.12")
  equal(jzzf_format(12345                 , params), "12345.00")
  equal(jzzf_format(12345.1               , params), "12345.10")
  equal(jzzf_format(12345.123             , params), "12345.12")
  equal(jzzf_format(12345.123456789       , params), "12345.12")
  equal(jzzf_format(-0.1                  , params), "-0.10")
  equal(jzzf_format(-0.123                , params), "-0.12")
  equal(jzzf_format(-0.123456789          , params), "-0.12")
  equal(jzzf_format(-1                    , params), "-1.00")
  equal(jzzf_format(-1.1                  , params), "-1.10")
  equal(jzzf_format(-1.123                , params), "-1.12")
  equal(jzzf_format(-1.123456789          , params), "-1.12")
  equal(jzzf_format(-123                  , params), "-123.00")
  equal(jzzf_format(-123.1                , params), "-123.10")
  equal(jzzf_format(-123.123              , params), "-123.12")
  equal(jzzf_format(-123.123456789        , params), "-123.12")
  equal(jzzf_format(-12345               , params), "-12345.00")
  equal(jzzf_format(-12345.1             , params), "-12345.10")
  equal(jzzf_format(-12345.123           , params), "-12345.12")
  equal(jzzf_format(-12345.123456789     , params), "-12345.12")
});

test("leading zeros", function() {
  params = {"prefix": "", "postfix": "", "fixed": false, "decimals": 9, "zeros": 4, "thousands": "", "point": "."}
  
  equal(jzzf_format(0                     , params), "0000")
  equal(jzzf_format(0.0000000001          , params), "0000")
  equal(jzzf_format(0.0000000009          , params), "0000.000000001")
  equal(jzzf_format(0.1                   , params), "0000.1")
  equal(jzzf_format(0.123                 , params), "0000.123")
  equal(jzzf_format(0.123456789           , params), "0000.123456789")
  equal(jzzf_format(1                     , params), "0001")
  equal(jzzf_format(1.1                   , params), "0001.1")
  equal(jzzf_format(1.123                 , params), "0001.123")
  equal(jzzf_format(1.123456789           , params), "0001.123456789")
  equal(jzzf_format(123                   , params), "0123")
  equal(jzzf_format(123.1                 , params), "0123.1")
  equal(jzzf_format(123.123               , params), "0123.123")
  equal(jzzf_format(123.123456789         , params), "0123.123456789")
  equal(jzzf_format(12345                 , params), "12345")
  equal(jzzf_format(12345.1               , params), "12345.1")
  equal(jzzf_format(12345.123             , params), "12345.123")
  equal(jzzf_format(12345.123456789       , params), "12345.123456789")
  equal(jzzf_format(-0.1                  , params), "-0000.1")
  equal(jzzf_format(-0.123                , params), "-0000.123")
  equal(jzzf_format(-0.123456789          , params), "-0000.123456789")
  equal(jzzf_format(-1                    , params), "-0001")
  equal(jzzf_format(-1.1                  , params), "-0001.1")
  equal(jzzf_format(-1.123                , params), "-0001.123")
  equal(jzzf_format(-1.123456789          , params), "-0001.123456789")
  equal(jzzf_format(-123                  , params), "-0123")
  equal(jzzf_format(-123.1                , params), "-0123.1")
  equal(jzzf_format(-123.123              , params), "-0123.123")
  equal(jzzf_format(-123.123456789        , params), "-0123.123456789")
  equal(jzzf_format(-12345               , params), "-12345")
  equal(jzzf_format(-12345.1             , params), "-12345.1")
  equal(jzzf_format(-12345.123           , params), "-12345.123")
  equal(jzzf_format(-12345.123456789     , params), "-12345.123456789")
});

test("mixed", function() {
  params = {"prefix": "~", "postfix": " EUR", "fixed": true, "decimals": 2, "zeros": 4, "thousands": " ", "point": ","}
  equal(jzzf_format(0                     , params), "~0 000,00 EUR")
  equal(jzzf_format(0.0000000001          , params), "~0 000,00 EUR")
  equal(jzzf_format(0.0000000009          , params), "~0 000,00 EUR")
  equal(jzzf_format(0.1                   , params), "~0 000,10 EUR")
  equal(jzzf_format(0.123                 , params), "~0 000,12 EUR")
  equal(jzzf_format(0.123456789           , params), "~0 000,12 EUR")
  equal(jzzf_format(1                     , params), "~0 001,00 EUR")
  equal(jzzf_format(1.1                   , params), "~0 001,10 EUR")
  equal(jzzf_format(1.123                 , params), "~0 001,12 EUR")
  equal(jzzf_format(1.123456789           , params), "~0 001,12 EUR")
  equal(jzzf_format(123                   , params), "~0 123,00 EUR")
  equal(jzzf_format(123.1                 , params), "~0 123,10 EUR")
  equal(jzzf_format(123.123               , params), "~0 123,12 EUR")
  equal(jzzf_format(123.123456789         , params), "~0 123,12 EUR")
  equal(jzzf_format(12345                 , params), "~12 345,00 EUR")
  equal(jzzf_format(12345.1               , params), "~12 345,10 EUR")
  equal(jzzf_format(12345.123             , params), "~12 345,12 EUR")
  equal(jzzf_format(12345.123456789       , params), "~12 345,12 EUR")
  equal(jzzf_format(-0.1                  , params), "-~0 000,10 EUR")
  equal(jzzf_format(-0.123                , params), "-~0 000,12 EUR")
  equal(jzzf_format(-0.123456789          , params), "-~0 000,12 EUR")
  equal(jzzf_format(-1                    , params), "-~0 001,00 EUR")
  equal(jzzf_format(-1.1                  , params), "-~0 001,10 EUR")
  equal(jzzf_format(-1.123                , params), "-~0 001,12 EUR")
  equal(jzzf_format(-1.123456789          , params), "-~0 001,12 EUR")
  equal(jzzf_format(-123                  , params), "-~0 123,00 EUR")
  equal(jzzf_format(-123.1                , params), "-~0 123,10 EUR")
  equal(jzzf_format(-123.123              , params), "-~0 123,12 EUR")
  equal(jzzf_format(-123.123456789        , params), "-~0 123,12 EUR")
  equal(jzzf_format(-12345                , params), "-~12 345,00 EUR")
  equal(jzzf_format(-12345.1              , params), "-~12 345,10 EUR")
  equal(jzzf_format(-12345.123            , params), "-~12 345,12 EUR")
  equal(jzzf_format(-12345.123456789      , params), "-~12 345,12 EUR")
});

});
