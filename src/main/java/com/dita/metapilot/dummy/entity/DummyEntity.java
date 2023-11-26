package com.dita.metapilot.dummy.entity;

import lombok.*;

/**
 * <p>Dummy Entity for showing test sample.</p>
 * <hr>
 * <p>@AllArgsConstructor: The constructor has all fields was created.</p>
 * <p>@NoArgsConstructor: The constructor has no field was created.</p>
 * <p>@RequiredArgsConstructor: The constructor has some fields that has final keyword or @NonNull type was created.</p>
 * <p>@Data: Only use for data class.</p>
 * <p>@Builder: Declare the class to Builder design pattern.</p>
 *
 * @deprecated
 * @author Kiseok Kang (@jUqItEr)
 * @since 2023. 11. 21.
 * @version 1.0.0
 * */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DummyEntity {
    private int foo;
    private int bar;
}
