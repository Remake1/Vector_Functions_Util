(* Mathematica Source File *)


CloudDeploy[
  APIFunction[{"x" -> "String","y" -> "String", "z" -> "String" }, ResourceFunction["TangentVector"][{ToExpression[#x],ToExpression[#y],ToExpression[#z]}, t] &, "JPEG"], "factorAPI"]

(**)


