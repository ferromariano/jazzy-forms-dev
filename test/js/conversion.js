$(document).ready(function(){

module("Error");

test("err div/0", function() {
  var err = new Jzzf_Error(Jzzf_Error.DIV0);
  equal(err.toString(), '#DIV/0!');
});

test("err name", function() {
  var err = new Jzzf_Error(Jzzf_Error.NAME);
  equal(err.toString(), '#NAME?');
});

module("Conversion");

test("text to text", function() {
  var val = new Jzzf_Value("123");
  strictEqual(val.text(), '123');
});

test("text to number", function() {
  var val = new Jzzf_Value("12.3");
  strictEqual(val.number(), 12.3);
});

test("text to number, trailing characters", function() {
  var val = new Jzzf_Value("123k");
  raises(function() { var num = val.number(); }, Jzzf_Error);
});

test("text to number, trailing space", function() {
  var val = new Jzzf_Value("123 ");
  strictEqual(val.number(), 123);
});

test("text to number, leading space", function() {
  var val = new Jzzf_Value(" 123");
  strictEqual(val.number(), 123);
});

test("text to number, negative", function() {
  var val = new Jzzf_Value("-123");
  strictEqual(val.number(), -123);
});

test('"true" to bool', function() {
  var val = new Jzzf_Value("true");
  strictEqual(val.bool(), true);
});

test('"TRUE" to bool', function() {
  var val = new Jzzf_Value("TRUE");
  strictEqual(val.bool(), true);
});

test('"TRUE" (spaces and camel case) to bool', function() {
  var val = new Jzzf_Value("  tRuE  ");
  strictEqual(val.bool(), true);
});

test('"false" to bool', function() {
  var val = new Jzzf_Value("false");
  strictEqual(val.bool(), false);
});

test('"FALSE" to bool', function() {
  var val = new Jzzf_Value("TRUE");
  strictEqual(val.bool(), true);
});

test('"false" (spaces and camel case) to bool', function() {
  var val = new Jzzf_Value("  fAlSe ");
  strictEqual(val.bool(), false);
});

test('number string to bool', function() {
  var val = new Jzzf_Value("  123 ");
  strictEqual(val.bool(), true);
});

test('zero string to bool', function() {
  var val = new Jzzf_Value("  0 ");
  strictEqual(val.bool(), false);
});

test('empty string to bool', function() {
  var val = new Jzzf_Value("");
  strictEqual(val.bool(), false);
});

test('space string to bool', function() {
  var val = new Jzzf_Value("  ");
  strictEqual(val.bool(), false);
});

test('letters string to bool', function() {
  var val = new Jzzf_Value("a");
  raises(function() { var num = val.number(); }, Jzzf_Error, "#VALUE!");
});

test("number to text", function() {
  var val = new Jzzf_Value(123.4);
  strictEqual(val.text(), '123.4');
});

test("number to number (float)", function() {
  var val = new Jzzf_Value(0.3);
  strictEqual(val.number(), 0.3);
});

test("number to number (integer)", function() {
  var val = new Jzzf_Value(3);
  strictEqual(val.number(), 3);
});

test("number to number (zero)", function() {
  var val = new Jzzf_Value(0);
  strictEqual(val.number(), 0);
});

test('zero to bool', function() {
  var val = new Jzzf_Value(0);
  strictEqual(val.bool(), false);
});

test('one to bool', function() {
  var val = new Jzzf_Value(1);
  strictEqual(val.bool(), true);
});

test('negative to bool', function() {
  var val = new Jzzf_Value(-1);
  strictEqual(val.bool(), true);
});

test('true to text', function() {
  var val = new Jzzf_Value(true);
  strictEqual(val.text(), "TRUE");
});

test('false to text', function() {
  var val = new Jzzf_Value(false);
  strictEqual(val.text(), "FALSE");
});

test('false to number', function() {
  var val = new Jzzf_Value(false);
  strictEqual(val.number(), 0);
});

test('true to number', function() {
  var val = new Jzzf_Value(true);
  strictEqual(val.number(), 1);
});

test('false to bool', function() {
  var val = new Jzzf_Value(false);
  strictEqual(val.bool(), false);
});

test('true to bool', function() {
  var val = new Jzzf_Value(true);
  strictEqual(val.bool(), true);
});

module("Reference");

test('unknown', function() {
  function Engine() {
    this.evaluate = function(id) {
        return undefined;
    }
  }
  var ref = new Jzzf_Reference("igor", new Engine());
  raises(function() { var val = ref.number(); }, "#REF!");
});

test('success', function() {
  function Engine() {
    this.evaluate = function(id) {
        return 0.123;
    }
  }
  var ref = new Jzzf_Reference("igor", new Engine());
  strictEqual(ref.bool(), true);
  strictEqual(ref.number(), 0.123);
  strictEqual(ref.text(), "0.123");
  strictEqual(ref.id(), "igor");
});

test('dereference value', function() {
  var ref = new Jzzf_Value("whatever");
  raises(function() { var id = ref.id(); }, "#VALUE!");
});

test('raw text', function() {
  var val = new Jzzf_Value("text");
  strictEqual(val.raw(), "text");
});

test('raw number', function() {
  var val = new Jzzf_Value(123);
  strictEqual(val.raw(), 123);
});

test('raw zero', function() {
  var val = new Jzzf_Value(0);
  strictEqual(val.raw(), 0);
});

test('raw bool', function() {
  var val = new Jzzf_Value(false);
  strictEqual(val.raw(), false);
});

test('raw ref text', function() {
  var engine = new function() { this.evaluate = function() { return "text"; }};
  var val = new Jzzf_Reference("id", engine);
  strictEqual(val.raw(), "text");
});

test('raw ref number', function() {
  var engine = new function() { this.evaluate = function() { return 123; }};
  var val = new Jzzf_Reference("id", engine);
  strictEqual(val.raw(), 123);
});

test('raw ref zero', function() {
  var engine = new function() { this.evaluate = function() { return 0; }};
  var val = new Jzzf_Reference("id", engine);
  strictEqual(val.raw(), 0);
});

test('raw ref bool', function() {
  var engine = new function() { this.evaluate = function() { return false; }};
  var val = new Jzzf_Reference("id", engine);
  strictEqual(val.raw(), false);
});

});