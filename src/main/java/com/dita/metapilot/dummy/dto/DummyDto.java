package com.dita.metapilot.dummy.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * <p>Dummy Data Transfer Object for showing test sample.</p>
 * <hr>
 * <p>@AllArgsConstructor: The constructor has all fields was created.</p>
 * <p>@NoArgsConstructor: The constructor has no field was created.</p>
 * <p>@RequiredArgsConstructor: The constructor has some fields that has final keyword or @NonNull type was created.</p>
 * <p>@Builder: Declare the class to Builder design pattern.</p>
 * <p>@Getter: Set all getter by this annotation.</p>
 * <p>@Setter: Set all setter by this annotation.</p>
 *
 * @deprecated
 * @author Kiseok Kang (@jUqItEr)
 * @since 2023. 11. 21.
 * @version 1.0.0
 * */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DummyDto {
    private int foo;
    private int bar;
}